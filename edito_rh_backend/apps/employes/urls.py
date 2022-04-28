from django.urls import path

from .views import EmployesAPIView, EmployeAPIView,EmployesRubriquesAPIView

urlpatterns = [
    path('employés/<int:id>/', EmployeAPIView.as_view()),
    path('employés/', EmployesAPIView.as_view()),
    path('employés/<int:employe_id>/rubriques/<int:rubrique_id>', EmployesRubriquesAPIView.as_view())
]
