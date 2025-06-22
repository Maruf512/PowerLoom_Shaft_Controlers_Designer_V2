from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from designer.serializers import *
from designer.models import Designe, DesignGrid, CustomUser, Colors
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import generics

from django.middleware.csrf import get_token


class CustomTokenObtainPairView(TokenObtainPairView):

    serializer_class = EmailTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens["access"]
            refresh_token = tokens["refresh"]


            res = Response()

            res.data = {
                "id": tokens["user_id"],
                "username": tokens["username"],
                "email": tokens["email"],
            }


            csrf_token = get_token(request)

            res.set_cookie(
                key="csrftoken",
                value=csrf_token,
                httponly=False,
                secure=True,
                samesite="Lax",
                path="/"
            )

            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite="None",
                path="/",
            )

            res.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite="None",
                path="/",
            )

            return res

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class CustomRefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get("refresh_token")
            request.data["refresh"] = refresh_token
            response = super().post(request, *args, **kwargs)

            tokens = response.data
            access_token = tokens["access"]

            res = Response()

            res.data = {"refreshed": True}

            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite="None",
                path="/",
            )

            return res

        except:
            return Response({"refreshed": False}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([])
@authentication_classes([])
def logout(request):
    try:
        res = Response()
        res.delete_cookie("access_token", path="/", samesite="None")
        res.delete_cookie("refresh_token", path="/", samesite="None")
        res.data = {"success": True}
        return res
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# For Color models
class ColorsListCreateView(generics.ListCreateAPIView):
    serializer_class = ColorsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Colors.objects.filter(user=self.request.user).order_by("-created_at")

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context


class ColorsDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ColorsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Colors.objects.filter(user=self.request.user)


# ++++++++++++++++ Designer Section ++++++++++++++++
class DesigneListCreateView(generics.ListCreateAPIView):
    serializer_class = DesigneSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Designe.objects.filter(user=self.request.user).order_by("-created_at")

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context


class DesigneDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DesigneSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Designe.objects.filter(user=self.request.user)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context


# test

{
    "name": "eafdawed",
    "total_color_palettes": 3,
    "color_box_1": "#FF0000",
    "color_box_2": "#FF00FF",
    "color_box_3": "#FFFF00",
    "color_box_4": "#00FF00",
    "starting_position": "2",
    "machine_type": "left_handed",
    "design_grids": [
        {
            "color_box": 1,
            "total_pics": 5
        },
        {
            "color_box": 2,
            "total_pics": 8
        },
        {
            "color_box": 3,
            "total_pics": 12
        }
    ]
}