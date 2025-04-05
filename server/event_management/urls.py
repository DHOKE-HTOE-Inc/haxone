from django.urls import path, include
from rest_framework_nested import routers
from .views import EventViewSet

router = routers.DefaultRouter()
router.register(r"events", EventViewSet, basename="events")

urlpatterns = router.urls