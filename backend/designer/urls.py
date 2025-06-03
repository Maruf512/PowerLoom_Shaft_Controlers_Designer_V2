from django.urls import path
from .views import *

urlpatterns = [
    path("register/", register, name="register"),
    path("login/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("refresh/", CustomRefreshTokenView.as_view(), name="token_refresh"),
    path("logout/", logout, name="logout"),
    path("design/", designer, name="Designer"),
    
    path('colors/', ColorsListCreateView.as_view(), name='color-list-create'),
    path('colors/<int:pk>/', ColorsDetailView.as_view(), name='color-detail'),
]
