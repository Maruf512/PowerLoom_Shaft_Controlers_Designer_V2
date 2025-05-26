from django.http import JsonResponse


PUBLIC_PATHS = [
    '/designer/login/',
    '/designer/register/',
    '/designer/test/',
]


class SimpleMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        if request.path in PUBLIC_PATHS:
            return self.get_response(request)

        # Pass the request to the view
        response = self.get_response(request)

        # If the custom authentication class refreshed the token, set it in cookies
        new_access_token = getattr(request, '_refreshed_access_token', None)
        if new_access_token:
            response.set_cookie(
                'access_token',
                new_access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

        return response
