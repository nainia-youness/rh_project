from .models import Entite
from rest_framework import serializers
from ..users.serializer import UserSerializer

class EntiteSerializer(serializers.ModelSerializer):

    user=UserSerializer(read_only=True,many=False)
    class Meta:
        model = Entite
        fields = '__all__'
