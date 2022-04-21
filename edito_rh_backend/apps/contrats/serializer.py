from .models import Contrat
from rest_framework import serializers
from ..users.serializer import UserSerializer

class ContratSerializer(serializers.ModelSerializer):

    user=UserSerializer(read_only=True,many=False)
    class Meta:
        model = Contrat
        fields = '__all__'
