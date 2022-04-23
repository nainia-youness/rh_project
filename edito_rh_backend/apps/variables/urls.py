from django.urls import path

from .views import VariablesAPIView, VariableAPIView

urlpatterns = [
    path('variables/<int:id>/', VariableAPIView.as_view()),
    path('variables/', VariablesAPIView.as_view())
]
