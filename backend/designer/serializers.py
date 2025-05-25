from rest_framework import serializers
from designer.models import Designe, DesignGrid, Colors, CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model


User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = CustomUser
        fields = ['username', 'email','password']
    
    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email']


class DesigneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Designe
        fields = ['id', 'name', 'total_color_palettes', 'color_box_1', 'color_box_2', 'color_box_3', 'color_box_4', 'starting_position', 'machine_type', 'created_at']


class DesignGridSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesignGrid
        fields = ['id', 'design', 'color_box', 'total_pics']


class ColorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colors
        fields = ['id', 'color']


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = CustomUser.EMAIL_FIELD

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['user_id'] = user.id
        token['email'] = user.email
        token['username'] = user.username

        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)

        data['user_id'] = self.user.id
        data['email'] = self.user.email
        data['username'] = self.user.username

        return data



