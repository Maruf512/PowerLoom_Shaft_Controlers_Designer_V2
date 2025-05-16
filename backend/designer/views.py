from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from designer.serializers import UserSerializer, DesigneSerializer, DesignGridSerializer
from designer.models import Designe, DesignGrid
from django.contrib.auth.models import User

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        # try:
        #     response = super().post(request, *args, **kwargs)
        #     tokens = response.data
        pass
