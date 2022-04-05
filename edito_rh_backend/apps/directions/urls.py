from django.urls import path

from .views import DirectionsAPIView, DirectionAPIView

urlpatterns = [
    path('directions/<int:id>/', DirectionAPIView.as_view()),
    path('directions/', DirectionsAPIView.as_view())
]
