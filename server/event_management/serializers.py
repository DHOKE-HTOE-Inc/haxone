from rest_framework import serializers
from .models import Event, Application
from user.serializers import SimpelUserSerializer

class UserApplicationStatusSerializer(serializers.Serializer):
    has_applied = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    
    def get_has_applied(self, obj):
        user = self.context['request'].user
        if not user.is_authenticated: return False
        # If the user is not a staff, check if they have applied for the event
        # If the user is a staff, return False    
        return Application.objects.filter(user=user, event=obj).exists() if not user.is_staff else False
    
    def get_status(self, obj):
        user = self.context['request'].user
        if not user.is_authenticated: return None
        # If the user is a staff, return None
        # If the user is not a staff, get the application status if exists 
        if user.is_staff:
            return None      
        application = Application.objects.filter(user=user, event=obj).first()
        return application.status if application else None

class EventSerializer(serializers.ModelSerializer):
    organizer = SimpelUserSerializer(read_only=True)
    # Required to pass the whole Event object to nested serializer, source="*"
    application = UserApplicationStatusSerializer(read_only=True, source='*')
    class Meta:
        model = Event
        fields = ["id", "title", "description", "requirements", "organizer", "is_active", "location", "img", "max_participants", "reward", "start_date", "end_date", "application_deadline", "project_submission_deadline", 'application']

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
