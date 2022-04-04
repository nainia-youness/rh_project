from django.urls import path

from .views import ContratsView

urlpatterns = [
    path('contrats/<int:id>/', ContratsView.as_view()),
    path('contrats/', ContratsView.as_view())
]
