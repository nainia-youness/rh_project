from django.urls import path

from .views import EntitesView

urlpatterns = [
    path('entites/<int:id>/', EntitesView.as_view()),
    path('entites/', EntitesView.as_view())
]
