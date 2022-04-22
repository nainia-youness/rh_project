from django.urls import path

from .views import RubriquesAPIView, RubriqueAPIView

urlpatterns = [
    path('rubriques/<int:id>/', RubriqueAPIView.as_view()),
    path('rubriques/', RubriquesAPIView.as_view())
]
