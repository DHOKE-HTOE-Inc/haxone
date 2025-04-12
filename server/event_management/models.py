from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator
from uuid import uuid4
from django.utils import timezone

class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    requirements = models.TextField()
    organizer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="events")
    location = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    img = models.ImageField(upload_to="events/")
    max_participants = models.PositiveSmallIntegerField(default=1, validators=[MinValueValidator(1)])
    reward = models.PositiveSmallIntegerField(default=0, validators=[MinValueValidator(0)])
    start_date = models.DateField()
    end_date = models.DateField()
    application_deadline = models.DateField()
    project_submission_deadline = models.DateField()
    
    def clean(self):
        super().clean()
                
        #Ensure that the start date is before the end date
        if self.start_date > self.end_date:
            raise ValidationError("Start date must be before end date.")
        
        if self.application_deadline >= self.start_date:
            raise ValidationError("Application deadline must be before the event start date.")
        
        if not (self.start_date < self.project_submission_deadline < self.end_date):
            raise ValidationError("Project submission deadline must fall strictly within the event duration.")

    def save(self, *args, **kwargs):
        # Strip spaces to validate empty fields
        fields_to_check = ['title', 'description', 'requirements', 'location']
        for field in fields_to_check:
            value = getattr(self, field, "").strip()
            if not value:
                raise ValidationError({field: f"{field.replace('_', ' ').capitalize()} cannot be empty or just spaces."})
            setattr(self, field, value)
            
        self.full_clean()
        super().save(*args, **kwargs)
        
    def __str__(self) -> str:
        return f"{self.title} - {self.start_date} to {self.end_date}"
    
class Application(models.Model):
    PENDING = "pending"
    ACCEPTED = "accepted"
    REJECTED = "rejected"
    
    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (ACCEPTED, 'Accepted'),
        (REJECTED, 'Rejected')
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="applications")
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="applications")
    showcase_url = models.URLField(max_length=255)
    status = models.CharField(max_length=255, choices=STATUS_CHOICES, default='pending')
    applied_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['user', 'event']
        
    def clean(self):
        super().clean()
        
        if self.event.application_deadline < timezone.now().date():
            raise ValidationError("Application deadline has passed for this event.")
            
        if self.status == 'accepted':
            accepted_count = Application.objects.filter(event=self.event, status='accepted').count()
            if accepted_count >= self.event.max_participants:
                raise ValidationError("Event has reached maximum number of participants.")
                
    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.user.username} - {self.event.title} ({self.status})"
