from django.urls import path

from .views import CentresCoutView

urlpatterns = [
    path('centres-cout/<int:id>/', CentresCoutView.as_view()),
    path('centres-cout/', CentresCoutView.as_view())
]
