from rest_framework import serializers
from .models import Event
from user.serializers import SimpelUserSerializer

class EventSerializer(serializers.ModelSerializer):
    organizer = SimpelUserSerializer(read_only=True)
    
    class Meta:
        model = Event
        fields = ["id", "title", "description", "organizer", "is_active", "location", "img", "max_participants", "reward", "start_date", "end_date", "application_deadline", "project_submission_deadline"]
