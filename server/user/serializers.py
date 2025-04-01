from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer
from .models import User

class UserCreateSerializer(BaseUserCreateSerializer):  
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ("username", "email", "password")
        
class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = ('id', 'username', 'email', 'display_name', 'profile_img', 'skills', 'location', 'joined_at')