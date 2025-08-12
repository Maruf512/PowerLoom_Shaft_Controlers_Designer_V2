from rest_framework import serializers
from .models import DesignGrid, Designe, Colors
from accounts.models import Account




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'name', 'email']



class DesignGridSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesignGrid
        fields = ["id", "color_box", "total_pics"]
        read_only_fields = ('created_at', 'updated_at')



class DesignSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    design_grids = DesignGridSerializer(many=True, required=False, read_only=False, source='designgrid_set')
    class Meta:
        model = Designe
        fields = [
            "id", "name", "user", "total_color_palettes", "color_box_1", "color_box_2", "color_box_3", "color_box_4", "starting_position", "machine_type", "created_at", "updated_at", "design_grids"
            ]
        read_only_fields = ['created_at', 'updated_at']
    
    def create(self, validated_data):
        design_grids_data = validated_data.pop('designgrid_set', [])

        request = self.context.get('request')
        validated_data['user'] = request.user

        Designe_instance = super().create(validated_data)

        for gird_data in design_grids_data:
            DesignGrid.objects.create(design=Designe_instance, **gird_data)

        return Designe_instance
    

    def update(self, instance, validated_data):
        design_grids_data = validated_data.pop('designgrid_set', [])

        instance = super().update(instance, validated_data)

        if design_grids_data:
            instance.designgrid_set.all().delete()
            for gird_data in design_grids_data:
                DesignGrid.objects.create(design=instance, **gird_data)

        return instance



class ColorsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Colors
        fields = ["id", "color", "user", "created_at", "updated_at"]
        read_only_fields = ['created_at', 'updated_at']

    
    def create(self, validated_data):
        request = self.context.get('request')

        if request and request.user.is_authenticated:
            validated_data['user'] = request.user
        else:
            raise serializers.ValidationError("User is not authenticated.")

        return super().create(validated_data)

