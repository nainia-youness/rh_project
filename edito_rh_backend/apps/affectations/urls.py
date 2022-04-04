from django.urls import path

from .views import AffectationsView

urlpatterns = [
    path('affectations/<int:id>/', AffectationsView.as_view()),
    path('affectations/', AffectationsView.as_view())
]
