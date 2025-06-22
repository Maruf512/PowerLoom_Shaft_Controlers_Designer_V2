from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError # Ensure this is imported
from rest_framework.exceptions import AuthenticationFailed # Ensure this is imported

class CookiesJwtAuthentication(JWTAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get('access_token')
        refresh_token = request.COOKIES.get('refresh_token')

        print(f"Auth: Access Token found: {bool(access_token)}")
        print(f"Auth: Refresh Token found: {bool(refresh_token)}")

        if not access_token:
            print("Auth: No access token, returning None.")
            return None # No access token = skip authentication

        try:
            # 1. Attempt to validate the access token AND get the user from it.
            #    If either step raises TokenError, the except block will catch it.
            validated_token = self.get_validated_token(access_token)
            user = self.get_user(validated_token)
            print("Auth: Access token validated successfully, user found.")
            return (user, validated_token)

        except TokenError as e:
            # This block is executed if access_token is invalid or expired (TokenError is caught here)
            print(f"Auth: Access token failed validation/user lookup (TokenError: {e}). Attempting refresh...")

            if refresh_token:
                try:
                    # Attempt to get a new access token using the refresh token
                    new_refresh = RefreshToken(refresh_token)
                    new_access_token = str(new_refresh.access_token)
                    print("Auth: Refresh token used, new access token obtained.")

                    # Validate the newly obtained access token and get the user from it
                    validated_token = self.get_validated_token(new_access_token)
                    user = self.get_user(validated_token) # Get user from the new token

                    # If successful, store the new access token for the middleware to set the cookie
                    request._refreshed_access_token = new_access_token
                    print(f"Auth: User '{user.username}' authenticated with refreshed token.")
                    return (user, validated_token)

                except TokenError as refresh_e:
                    # Refresh token itself is invalid or expired
                    print(f"Auth: Refresh token also failed (TokenError: {refresh_e}). Raising AuthenticationFailed.")
                    raise AuthenticationFailed("Refresh token expired or invalid")
            else:
                # Access token failed, but no refresh token was found
                print("Auth: Access token expired and no refresh token found. Raising AuthenticationFailed.")
                raise AuthenticationFailed("Access token expired and no refresh token found")

        except Exception as e:
            # This is a fallback for any other unexpected errors during the authentication process
            # (should ideally not be hit for token-related issues with the above structure)
            print(f"Auth: An unexpected error occurred during authentication: {e}")
            raise AuthenticationFailed("Authentication failed due to an unexpected error.")