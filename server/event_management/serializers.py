from rest_framework import serializers

from .models import *
from user.serializers import UserSerializer


class EventSerializer(serializers.ModelSerializer):
    organizer = UserSerializer(read_only=True)
    
    class Meta:
        model = Event
        fields = '__all__'
        
    def validate(self, attrs):
        try:
            event = Event(**attrs)
            event.clean()
        except serializers.ValidationError as e:
            raise e
        
        return attrs
    
    