from django.urls import path
from .views import  *


urlpatterns = [
    path('designs/', DesignListCreateView.as_view(), name='design-list-create'),
    path('designs/<int:pk>/', DesignDetailView.as_view(), name='design-details'),

    path('colors/', ColorListCreateView.as_view(), name='color-list-create'),
    path('colors/<int:pk>/', ColorDetailView.as_view(), name='color-details'),
]
