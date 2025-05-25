from rest_framework import serializers
from designer.models import Designe, DesignGrid, Colors
from django.contrib.auth.models import User


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        user = User(username=validated_data["username"], email=validated_data["email"])
        user.set_password(validated_data["password"])
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


class DesigneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Designe
        fields = [
            "id",
            "name",
            "total_color_palettes",
            "color_box_1",
            "color_box_2",
            "color_box_3",
            "color_box_4",
            "starting_position",
            "machine_type",
            "created_at",
        ]


class DesignGridSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesignGrid
        fields = ["id", "design", "color_box", "total_pics"]


class ColorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colors
        fields = ["id", "color"]
