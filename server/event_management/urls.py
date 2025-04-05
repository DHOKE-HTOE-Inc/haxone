from django.urls import path, include
from rest_framework_nested import routers
from .views import EventViewSet, ApplicationViewSet

router = routers.DefaultRouter()
router.register(r"events", EventViewSet, basename="events")

# Create a nested router for applications
events_router = routers.NestedDefaultRouter(router, r"events", lookup="event")
events_router.register(r"applications", ApplicationViewSet, basename="event-applications")

urlpatterns = [
    path("", include(router.urls)),
    path("", include(events_router.urls)),
]