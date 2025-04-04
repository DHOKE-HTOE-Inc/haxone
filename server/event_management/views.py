from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Event
from .serializers import EventSerializer
from .permissions import IsEventOwner
from django.utils import timezone

class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    def get_permissions(self):
        
        if self.action == "fetch_events_to_apply":
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
        events = Event.objects.filter(application_deadline__gte=timezone.now())
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)