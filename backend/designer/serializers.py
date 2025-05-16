from django import serializers
from designer.models import Designe, DesignGrid, Colors
from django.contrib.auth.models import User


class DesigneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Designe
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class DesignGridSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesignGrid
        fields = '__all__'


class ColorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colors
        fields = '__all__'
