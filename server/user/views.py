from rest_framework import generics
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from djoser.views import UserViewSet

from .models import User
from .serializers import UserSerializer

class CustomUserViewSet(UserViewSet):
    @action(detail=False, methods=['GET'], url_path='username/(?P<username>[^/.]+)')
    def get_by_username(self, request, username=None):
        user = get_object_or_404(self.get_queryset(), username=username)
        serializer = self.get_serializer(user)
        return Response(serializer.data)
