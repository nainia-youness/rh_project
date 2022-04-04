from .models import Direction
from rest_framework import serializers


class DirectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Direction
        fields = '__all__'
