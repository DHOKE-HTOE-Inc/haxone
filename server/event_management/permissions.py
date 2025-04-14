from rest_framework.permissions import BasePermission

class IsEventOwner(BasePermission):
    def has_permission(self, request, view):
        if hasattr(view, 'kwargs') and 'event_pk' in view.kwargs:
            from .models import Event
            from django.shortcuts import get_object_or_404
            
            try:
                event = get_object_or_404(Event, id=view.kwargs['event_pk'])
                return event.organizer == request.user
            except:
                return False
        
        return True
    
    def has_object_permission(self, request, view, obj):
        if hasattr(obj, 'organizer'):
            return obj.organizer == request.user
        
        if hasattr(obj, 'event'):
            return obj.event.organizer == request.user
        
        return False

class IsNotStaff(BasePermission):
    def has_permission(self, request, view):
        return not request.user.is_staff
    