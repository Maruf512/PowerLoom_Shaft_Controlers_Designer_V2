from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email



class Colors(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    color = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.color



class Designe(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, unique=True)
    total_color_palettes = models.PositiveIntegerField()
    color_box_1 = models.CharField(max_length=255)
    color_box_2 = models.CharField(max_length=255)
    color_box_3 = models.CharField(max_length=255)
    color_box_4 = models.CharField(max_length=255)
    starting_position = models.CharField(max_length=255)
    machine_type = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name



class DesignGrid(models.Model):
    design = models.ForeignKey(Designe, on_delete=models.CASCADE)
    color_box = models.PositiveIntegerField()
    total_pics = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Design {self.design.name} - Color Box {self.color_box}"


