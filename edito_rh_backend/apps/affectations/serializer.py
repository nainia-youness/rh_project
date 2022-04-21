from .models import Affectation
from rest_framework import serializers
from ..users.serializer import UserSerializer

class AffectationSerializer(serializers.ModelSerializer):

    user=UserSerializer(read_only=True,many=False)
    class Meta:
        model = Affectation
        fields = '__all__'
