from django.db import models
from django.contrib.auth.models import AbstractUser
from uuid import uuid4

class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    email = models.EmailField(unique=True)
    display_name = models.CharField(max_length=255, null=True, blank=True)
    profile_img = models.ImageField(upload_to="profiles/", null=True, blank=True)
    skills = models.JSONField(null=True, blank=True, default=list)
    current_job = models.TextField(null=True, blank=True)
    location = models.TextField(null=True, blank=True)
    joined_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.username:
            self.username = self.username.lower()
        
        if self.email:
            self.email = self.email.lower()
            
        super().save(*args, **kwargs)
        
    def __str__(self):
        return self.username