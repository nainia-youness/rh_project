from django.urls import path
from .views import FonctionAPIView, FonctionDetails, FonctionsView, fonctions_list, fonction_details


urlpatterns = [
    #path('fonctions/', fonctions_list),
    path('fonctions/<int:id>/', FonctionsView.as_view()),
    path('fonctions/', FonctionsView.as_view())
    #path('fonctions/<int:id>/', FonctionDetails.as_view())
    #path('fonctions/<int:pk>/', fonction_details),
]
# car_put car_delete car_post
