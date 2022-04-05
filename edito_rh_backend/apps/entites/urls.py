from django.urls import path

from .views import EntitesAPIView, EntiteAPIView

urlpatterns = [
    path('entites/<int:id>/', EntiteAPIView.as_view()),
    path('entites/', EntitesAPIView.as_view())
]
