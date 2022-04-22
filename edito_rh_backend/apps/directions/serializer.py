from .models import Direction
from rest_framework import serializers
from ..users.serializer import UserSerializer

class DirectionSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        return response

    class Meta:
        model = Direction
        fields = '__all__'
