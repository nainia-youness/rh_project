from django.urls import path

from .views import CentreCoutsAPIView, CentreCoutAPIView

urlpatterns = [
    path('centres-cout/<int:id>/', CentreCoutAPIView.as_view()),
    path('centres-cout/', CentreCoutsAPIView.as_view())
]
