from django.urls import path
from .views import FonctionAPIView, FonctionsAPIView, FonctionsView, fonctions_list, fonction_details


urlpatterns = [
    #path('fonctions/', fonctions_list),
    #path('fonctions/<int:id>/', FonctionsView.as_view()),
    #path('fonctions/', FonctionsView.as_view())
    path('fonctions/', FonctionsAPIView.as_view()),
    path('fonctions/<int:id>/', FonctionAPIView.as_view()),
    #path('fonctions/<int:pk>/', fonction_details),
]
# car_put car_delete car_post
