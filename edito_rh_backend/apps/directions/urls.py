from django.urls import path

from .views import DirectionsView

urlpatterns = [
    path('directions/<int:id>/', DirectionsView.as_view()),
    path('directions/', DirectionsView.as_view())
]
