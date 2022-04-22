from wsgiref import validate

#from ..employes.serializer import EmployeSerializer
from .models import Fonction
from rest_framework import serializers
from ..users.serializer import UserSerializer

class FonctionSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        return response
        
    class Meta:
        model = Fonction
        fields = '__all__'
