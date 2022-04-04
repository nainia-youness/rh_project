from django.urls import path

from .views import VillesView

urlpatterns = [
    path('villes/<int:id>/', VillesView.as_view()),
    path('villes/', VillesView.as_view())
]
