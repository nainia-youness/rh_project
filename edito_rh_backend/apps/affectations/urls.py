from django.urls import path

from .views import AffectationsAPIView, AffectationAPIView

urlpatterns = [
    path('affectations/<int:id>/', AffectationAPIView.as_view()),
    path('affectations/', AffectationsAPIView.as_view())
]
