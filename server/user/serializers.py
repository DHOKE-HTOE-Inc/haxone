from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer
from .models import User
from rest_framework import serializers

class UserCreateSerializer(BaseUserCreateSerializer):  
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ("username", "email", "password")
        
class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = ('id', 'username', 'email', 'display_name', 'profile_img', 'skills', 'location', 'current_job', 'is_staff', 'joined_at')
        
class SimpelUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "display_name", "is_staff")