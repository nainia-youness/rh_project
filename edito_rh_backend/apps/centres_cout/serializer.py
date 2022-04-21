from .models import CentreCout
from rest_framework import serializers
from ..users.serializer import UserSerializer

class CentreCoutSerializer(serializers.ModelSerializer):

    user=UserSerializer(read_only=True,many=False)
    class Meta:
        model = CentreCout
        fields = '__all__'
