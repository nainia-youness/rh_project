from django.urls import path

from .views import EmployesAPIView, EmployeAPIView,EmployesRubriquesAPIView

urlpatterns = [
    path('employes/<int:id>/', EmployeAPIView.as_view()),
    path('employes/', EmployesAPIView.as_view()),
    path('employes/<int:employe_id>/rubriques/<int:rubrique_id>', EmployesRubriquesAPIView.as_view())
]
