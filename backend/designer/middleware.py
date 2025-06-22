# designer/middleware.py

from django.conf import settings

class SetRefreshedAccessTokenCookieMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # Check if our custom auth class set a new token
        if hasattr(request, '_refreshed_access_token'):
            new_access_token = request._refreshed_access_token
            response.set_cookie(
                key=getattr(settings, 'SIMPLE_JWT_ACCESS_TOKEN_COOKIE_NAME', 'access_token'),
                value=new_access_token,
                httponly=True,
                samesite='Lax', # Or 'None' if cross-domain with secure=True
                secure=settings.DEBUG is False, # True in production, False for http://localhost
                max_age=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds()
            )
        return response