from django.urls import path

from .views import ContratsAPIView, ContratAPIView

urlpatterns = [
    path('contrats/<int:id>/', ContratAPIView.as_view()),
    path('contrats/', ContratsAPIView.as_view())
]
