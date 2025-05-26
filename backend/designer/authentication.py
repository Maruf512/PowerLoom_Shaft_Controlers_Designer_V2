from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.exceptions import AuthenticationFailed

class CookiesJwtAuthentication(JWTAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get('access_token')
        refresh_token = request.COOKIES.get('refresh_token')


        if not access_token:
            return None  # No access token = skip authentication

        try:
            validated_token = self.get_validated_token(access_token)
        except TokenError:
            # Try to refresh access token
            if refresh_token:
                try:
                    new_refresh = RefreshToken(refresh_token)
                    new_access_token = str(new_refresh.access_token)

                    # Inject into request for DRF auth
                    validated_token = self.get_validated_token(new_access_token)

                    # Set the new token so the middleware can attach it to the response
                    request._refreshed_access_token = new_access_token

                except TokenError:
                    raise AuthenticationFailed("Refresh token expired or invalid")
            else:
                raise AuthenticationFailed("Access token expired and no refresh token found")

        try:
            user = self.get_user(validated_token)
        except Exception:
            raise AuthenticationFailed("User not found or token invalid")

        return (user, validated_token)
