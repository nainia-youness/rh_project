from .models import Direction
from rest_framework import serializers
from ..users.serializer import UserSerializer

class DirectionSerializer(serializers.ModelSerializer):

    user=UserSerializer(read_only=True,many=False)
    class Meta:
        model = Direction
        fields = '__all__'
