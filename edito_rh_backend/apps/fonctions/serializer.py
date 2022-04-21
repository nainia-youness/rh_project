from wsgiref import validate

#from ..employes.serializer import EmployeSerializer
from .models import Fonction
from rest_framework import serializers
from ..users.serializer import UserSerializer

class FonctionSerializer(serializers.ModelSerializer):

    user=UserSerializer(read_only=True,many=False)
    class Meta:
        model = Fonction
        fields = '__all__'
