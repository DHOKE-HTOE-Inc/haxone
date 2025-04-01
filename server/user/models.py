from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.EmailField(unique=True)

    def save(self, *args, **kwargs):
        if self.username:
            self.username = self.username.lower()
        
        if self.email:
            self.email = self.email.lower()
            
        super().save(*args, **kwargs)