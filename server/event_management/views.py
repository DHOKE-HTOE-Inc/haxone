from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import permissions

from .models import Event
from .serializers import EventSerializer

class EventListCreateAPIView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(organizer=self.request.user)