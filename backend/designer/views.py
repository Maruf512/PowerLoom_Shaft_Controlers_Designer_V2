from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from designer.serializers import *
from designer.models import Designe, DesignGrid, CustomUser
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


class CustomTokenObtainPairView(TokenObtainPairView):

    serializer_class = EmailTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens["access"]
            refresh_token = tokens["refresh"]

            res = Response()

            res.data = {"success": True}

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


