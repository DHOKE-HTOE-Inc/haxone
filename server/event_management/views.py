from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from django.utils import timezone
from django.shortcuts import get_object_or_404
from .models import Event, Application
from .serializers import EventSerializer, ApplicationSerializer
from .permissions import IsEventOwner

class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["title"]
    ordering_fields = ["start_date"]
    
    def get_permissions(self):
        if self.action in ["fetch_events_to_apply", "retrieve"]:
            return [IsAuthenticated()]
        
        if self.action in ["update", "partial_update", "destroy"]:
            return [IsAuthenticated(), IsAdminUser(), IsEventOwner()]
        
        return super().get_permissions()
    
    def get_queryset(self):
        return Event.objects.filter(organizer=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(organizer=self.request.user)
        
    @action(detail=False, methods=["get"], url_path="events-to-apply")
    def fetch_events_to_apply(self, request):
        queryset = Event.objects.filter(application_deadline__gte=timezone.now())
        queryset = self.filter_queryset(queryset)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=["post"], url_path="apply")
    def apply_to_event(self, request, pk=None):
        event = get_object_or_404(Event, id=pk)

        if Application.objects.filter(user=request.user, event=event).exists():
            return Response(
                {"detail": "You have already applied to this event."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        application = Application.objects.create(
            user=request.user,
            event=event,
            showcase_url=request.data.get("showcase_url")
        )
        
        serializer = ApplicationSerializer(application)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_permissions(self):
        if self.action inhttps://github.com/DHOKE-HTOE-Inc/haxone/pulls ["list", "update", "partial_update"]:
            return [IsAuthenticated(), IsEventOwner()]
        
        return super().get_permissions() 
    
    def get_queryset(self):
        event_id = self.kwargs.get("event_pk")
        return Application.objects.filter(event=event_id)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        return Response(
            {"detail": "Method not allowed. Applications should be created through a different endpoint."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )
        
    def destroy(self, request, *args, **kwargs):
        return Response(
            {"detail": "Method not allowed. Applications cannot be deleted."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )
