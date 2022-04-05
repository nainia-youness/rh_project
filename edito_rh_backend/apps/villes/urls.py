from django.urls import path

from .views import VilleAPIView, VillesAPIView

urlpatterns = [
    path('villes/<int:id>/', VilleAPIView.as_view()),
    path('villes/', VillesAPIView.as_view())
]
