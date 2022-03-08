from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('employés/', views.home, name="employé_home"),
]
