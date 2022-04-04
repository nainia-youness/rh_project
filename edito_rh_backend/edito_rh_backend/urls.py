"""edito_rh_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

base_url = 'api/v1/'


urlpatterns = [
    path(base_url, include('apps.fonctions.urls')),
    path(base_url, include('apps.entites.urls')),
    path(base_url, include('apps.centres_cout.urls')),
    path(base_url, include('apps.directions.urls')),
    path(base_url, include('apps.villes.urls')),
    path(base_url, include('apps.contrats.urls')),
    path(base_url, include('apps.affectations.urls')),
    path('admin/', admin.site.urls),
]
