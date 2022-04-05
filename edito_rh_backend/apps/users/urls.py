from django.urls import path

from .views import LogoutView, RefreshView, RegisterView, LoginView, UserView

urlpatterns = [
    path('auth/register/', RegisterView.as_view()),
    path('auth/login/', LoginView.as_view()),
    path('auth/user/', UserView.as_view()),
    path('auth/refresh/', RefreshView.as_view()),
    path('auth/logout/', LogoutView.as_view()),
]
