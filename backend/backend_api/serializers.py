from rest_framework.serializers import ModelSerializer, SerializerMethodField, StringRelatedField

from .models import Staff, Positions


class StaffSerializer(ModelSerializer):
    position = StringRelatedField()
    manager = StringRelatedField()

    class Meta:
        model = Staff
        fields = '__all__'


class PositionsSerializer(ModelSerializer):
    manager = StringRelatedField()

    class Meta:
        model = Positions
        fields = '__all__'

