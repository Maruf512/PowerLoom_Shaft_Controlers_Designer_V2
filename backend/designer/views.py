from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.models import Account
from rest_framework.permissions import IsAuthenticated
from .models import Designe, Colors
from .serializers import DesignSerializer, ColorsSerializer
from rest_framework import generics



# =======================
# ======================= Color Section
# =======================
# View all colors
class ColorListCreateView(generics.ListCreateAPIView):
    serializer_class = ColorsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Colors.objects.filter(user=self.request.user).order_by('-created_at')


    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


# View single color with (update, delete)
class ColorDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ColorsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Colors.objects.filter(user=self.request.user)



# =======================
# ======================= Designer Section
# =======================
# View all design
class DesignListCreateView(generics.ListCreateAPIView):
    serializer_class = DesignSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Designe.objects.filter(user=self.request.user).order_by('-created_at')
    

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


# View single design with (update, delete)
class DesignDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DesignSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Designe.objects.filter(user=self.request.user)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context







# Demo data
{
    "name": "Design 1",
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