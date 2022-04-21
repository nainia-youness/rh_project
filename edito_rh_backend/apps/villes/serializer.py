from .models import Ville
from rest_framework import serializers
from ..users.serializer import UserSerializer

class VilleSerializer(serializers.ModelSerializer):

    user=UserSerializer(read_only=True,many=False)
    class Meta:
        model = Ville
        fields = '__all__'
