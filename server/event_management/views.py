from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.exceptions import ValidationError
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.db import transaction
from .models import Event, Application
from .serializers import EventSerializer, ApplicationSerializer, SimpleEventSerializer, CreateApplicationSerializer
from .permissions import IsEventOwner, IsNotStaff

class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["title"]
    ordering_fields = ["start_date"]
    
    def get_permissions(self):
        if self.action in ["create", "list"]:
            return [IsAuthenticated(), IsAdminUser()]
        
        if self.action in ["update", "partial_update", "destroy"]:
            return [IsAuthenticated(), IsEventOwner()]
        
        return []
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return Event.objects.filter(organizer=self.request.user)
        return Event.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(organizer=self.request.user)
        
    @action(detail=False, methods=["get"], url_path="events-to-apply")
    def fetch_events_to_apply(self, request):
        queryset = Event.objects.filter(application_deadline__gte=timezone.now())
        queryset = self.filter_queryset(queryset)
        serializer = SimpleEventSerializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=["post"], url_path="apply", serializer_class=CreateApplicationSerializer, permission_classes=[IsAuthenticated, IsNotStaff])
    def apply_to_event(self, request, pk=None):
        event = get_object_or_404(Event, id=pk)

        if Application.objects.filter(user=request.user, event=event).exists():
            return Response(
                {"detail": "You have already applied to this event."},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        serializer = CreateApplicationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        Application.objects.create(
            user=request.user,
            event=event,
            showcase_url=serializer.validated_data["showcase_url"]
        )
        
        return Response(
            {"detail": "Application submitted successfully."}, 
            status=status.HTTP_201_CREATED
        )
    
class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    # Specify only allowed HTTP methods
    http_method_names = ["get", "post"]

    def get_permissions(self):
        if self.action in ["list", "accept", "bulk-status-update"]:
            return [IsAuthenticated(), IsEventOwner()]
        return [IsAuthenticated()] 
    
    def get_queryset(self):
        event_id = self.kwargs.get("event_pk")
        event = get_object_or_404(Event, id=event_id)
        return Application.objects.filter(event=event)
    
    # Do not allow default POST request of ApplicationViewSet
    def create(self, request, *args, **kwargs):
        return Response({"detail": "Method not allowed. Applications cannot be created via this endpoint."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        
    @action(detail=False, methods=["post"], url_path="bulk-status-update")
    def accept_application(self, request, pk=None):
        # Get Event Id from nested URL
        event = get_object_or_404(Event, id=self.kwargs.get("event_pk"))
        
        # Get application IDs from request payload
        application_ids = self.request.data.get("applications", [])
        status_to_update = self.request.data.get("status", None)
        
        if (status_to_update is None) or (status_to_update not in [Application.ACCEPTED, Application.REJECTED]):
            return Response({"detail": "Invalid status provided."}, status=status.HTTP_400_BAD_REQUEST) 
                
        try:
            # Get validated applications
            applications = self.get_validated_applications(application_ids, event, status_to_update)
            
            # Check if there's no applcation to update
            if not applications.exists():
                raise ValidationError("No valid applications found to accept")
            
            # Bulk Update    
            self.status_bulk_update(applications, status_to_update)
            
            # Success Response
            return Response({"detail": f"{len(applications)} applications {status_to_update}."}, status=status.HTTP_200_OK)
       
        # REST API Error Handling 
        except ValidationError as err:
            return Response({"detail": str(err)}, status=status.HTTP_400_BAD_REQUEST)
        
        # Server Error Handling
        except Exception as err:
            return Response({"detail": f"An error occurred: {str(err)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    # Helper method to bulk update application status    
    def status_bulk_update(self, applications, status_to_update):
        with transaction.atomic():
            for application in applications:
                application.status = status_to_update
            Application.objects.bulk_update(applications, ["status"])

    # Helper method to validate and filter applications            
    def get_validated_applications(self, application_ids, event, status_to_update):
        
        if not isinstance(application_ids, list):
            raise ValidationError("Applications must be a list of IDs")
            
        if not application_ids:
            raise ValidationError("No applications provided")
            
        # Filter the allowed applications to update
        return Application.objects.filter(id__in=application_ids, event=event).exclude(status=status_to_update)