from django.urls import path

from .views import EmployesAPIView, EmployeAPIView

urlpatterns = [
    path('employes/<int:id>/', EmployeAPIView.as_view()),
    path('employes/', EmployesAPIView.as_view())
]
