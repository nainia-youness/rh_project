from django.urls import path

from .views import FormuleAPIView, FormulesAPIView,FormulesVariablesAPIView;


urlpatterns = [
    path('formules/<int:id>/', FormuleAPIView.as_view()),
    path('formules/', FormulesAPIView.as_view()),
    path('formules/<int:formule_id>/variables/<int:variable_id>', FormulesVariablesAPIView.as_view())
]
