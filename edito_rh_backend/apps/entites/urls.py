from django.urls import path

from .views import EntitesAPIView, EntiteAPIView

urlpatterns = [
    path('entités/<int:id>/', EntiteAPIView.as_view()),
    path('entités/', EntitesAPIView.as_view())
]
