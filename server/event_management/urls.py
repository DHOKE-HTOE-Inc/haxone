from django.urls import path

from . import views

urlpatterns = [
    path('', views.EventListCreateAPIView.as_view(), name="Event List Create")
]

