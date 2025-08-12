from django.urls import path
from .views import *


# Default registration id {"email": "example3@gmail.com", "password": "11111111"} (already exists in db)

urlpatterns = [
    path('refresh/', CookieTokenObtainView.as_view(), name='refresh_Token'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', profileView.as_view(), name='profile'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('login/', LoginView.as_view(), name='login'),
]
