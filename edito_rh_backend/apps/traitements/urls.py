from django.urls import path

from .views import TraitementsAPIView, TraitementAPIView

urlpatterns = [
    path('traitements/<int:id>/', TraitementAPIView.as_view()),
    path('traitements/', TraitementsAPIView.as_view())
]
