from rest_framework import serializers
from .models import Event, Application
from user.serializers import SimpelUserSerializer

class EventSerializer(serializers.ModelSerializer):
    organizer = SimpelUserSerializer(read_only=True)
    
    class Meta:
        model = Event
        fields = ["id", "title", "description", "requirements", "organizer", "is_active", "location", "img", "max_participants", "reward", "start_date", "end_date", "application_deadline", "project_submission_deadline"]

class SimpleEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ["id", "title", "description", "location", "img", "start_date"]


class ApplicationSerializer(serializers.ModelSerializer):
    user = SimpelUserSerializer(read_only=True)
    
    class Meta:
        model = Application
        fields = ["id", "user", "event", "showcase_url", "status", "applied_at"]
        
class CreateApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ["showcase_url"]
