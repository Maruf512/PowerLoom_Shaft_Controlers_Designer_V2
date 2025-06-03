from rest_framework import serializers
from designer.models import Designe, DesignGrid, Colors, CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model


# Get The CustomUser model
User = get_user_model()

# --- 1. User Registration Serializer ---
# For handling new user sign-ups
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = CustomUser
        fields = ["email", "username", "password"]
        extra_kwargs = {
            'email': {'required': True},
            'username': {'required': False, 'allow_blank': True}
        }


    def create(self, validated_data):
        username = validated_data.get("username", validated_data["email"])
        if not username:
            username = validated_data["email"]

        user = CustomUser(
            username=username,
            email=validated_data["email"]
        )
        user.set_password(validated_data["password"])
        user.save()
        return user

# --- 2. Basic User Serializer ---
# For displaying user information
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username", "email"]

# --- 3. Colors Serializer ---
# For managing individual color entries
class ColorsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Colors
        fields = ["id", "color", "user", "created_at", "updated_at"]
        read_only_fields = ("created_at", "updated_at",)


    def create(self, validated_data):
        # Automatically assign the current authenticated user to the 'user' field
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['user'] = request.user
        else:
            raise serializers.ValidationError("Authentication required to create a Color.")
        return super().create(validated_data)


# --- 4. DesignGrid Serializer ---
# Used for nested representation within DesigneSerializer
class DesignGridSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesignGrid
        # When nested, the 'design' field is typically excluded
        # as it's set by the parent Designe instance.
        fields = ["id", "color_box", "total_pics"]
        # 'design', 'created_at', 'updated_at' are usually excluded or read-only
        read_only_fields = ("created_at", "updated_at",)


# --- 5. Designe Serializer ---
# The main serializer for your Designe model, including nested DesignGrid instances
class DesigneSerializer(serializers.ModelSerializer):
    # This will display the user's basic info
    user = UserSerializer(read_only=True)

    # Nested serializer for DesignGrid.
    # 'many=True' because one Designe can have multiple DesignGrid entries.
    # 'read_only=False' (default) allows creating/updating nested data.
    # 'required=False' allows a design to be created without grids initially.
    # 'source='designgrid_set'' maps to the reverse relationship from DesignGrid to Designe.
    design_grids = DesignGridSerializer(
        many=True, read_only=False, required=False, source='designgrid_set'
    )

    class Meta:
        model = Designe
        fields = [
            "id", "name", "user", "total_color_palettes",
            "color_box_1", "color_box_2", "color_box_3", "color_box_4",
            "starting_position", "machine_type", "created_at", "updated_at",
            "design_grids" # Include the nested field
        ]
        read_only_fields = ("created_at", "updated_at",)

    def create(self, validated_data):
        # Pop the nested data before creating the parent instance
        design_grids_data = validated_data.pop('designgrid_set', [])

        # Assign the current authenticated user to the 'user' field
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['user'] = request.user
        else:
            raise serializers.ValidationError("Authentication required to create a Designe.")

        # Create the Designe instance
        designe_instance = super().create(validated_data)

        # Create associated DesignGrid instances
        for grid_data in design_grids_data:
            DesignGrid.objects.create(design=designe_instance, **grid_data)

        return designe_instance

    def update(self, instance, validated_data):
        # Handle updating nested design_grids. This is a common pattern:
        # 1. Pop nested data.
        # 2. Update the parent instance.
        # 3. Handle the nested data (e.g., clear existing and re-create, or manage individually).
        design_grids_data = validated_data.pop('designgrid_set', [])

        # Update Designe instance fields
        instance = super().update(instance, validated_data)

        # Option 1: Simple update by deleting all existing and re-creating (common for full replacement)
        if design_grids_data:
            instance.designgrid_set.all().delete() # Delete all related grids
            for grid_data in design_grids_data:
                DesignGrid.objects.create(design=instance, **grid_data)
        # Option 2: If design_grids_data is an empty list, and you sent it explicitly,
        # it might mean you want to clear all grids. This depends on your desired API behavior.
        # else:
        #     instance.designgrid_set.all().delete() # Or don't do anything if no new data is sent

        return instance


# --- 6. Custom Token Obtain Pair Serializer ---
# Extends Simple JWT's default to add custom claims to the token payload
class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = CustomUser.EMAIL_FIELD # Specify that 'email' is used for login

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims (user's ID, email, and username) to the token payload
        token['user_id'] = user.id
        token['email'] = user.email
        token['username'] = user.username # Ensure this is correct if username is not explicitly set by user

        return token

    def validate(self, attrs):
        # This method is called after successful user authentication (email/password check)
        # It adds user details to the response data (not the token itself)
        data = super().validate(attrs)

        # Add user details to the response body alongside the access and refresh tokens
        data['user_id'] = self.user.id
        data['email'] = self.user.email
        data['username'] = self.user.username # Ensure this is correct

        return data
    