from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError

from uuid import uuid4

class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    organizer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="events")
    location = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    img = models.ImageField(upload_to="events/")
    max_participants = models.PositiveSmallIntegerField(default=1)
    reward = models.PositiveSmallIntegerField(default=0)
    start_date = models.DateField()
    end_date = models.DateField()
    application_deadline = models.DateField()
    project_submission_deadline = models.DateField()
    
    def clean(self):
        super().clean()
        #Ensure that the start date is before the end date
        if self.start_date > self.end_date:
            raise ValidationError("Start date must be before end date.")
        
        #Ensure that the application deadline is before the end date and must not be the same as Project submission deadline
        if (self.application_deadline <= self.start_date) or (self.application_deadline >= self.end_date) or (self.application_deadline == self.project_submission_deadline):
            raise ValidationError("Application deadline must be before the event ends. and must not be the same as project submission deadline.")
        
        if (self.project_submission_deadline <= self.start_date) or (self.project_submission_deadline >= self.end_date):
            raise ValidationError("Project submission deadline must fall within the event duration.")
    
    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
        
    def __str__(self) -> str:
        return f"{self.title} - {self.start_date} to {self.end_date}"