from .models import Contrat
from rest_framework import serializers
from ..users.serializer import UserSerializer

class ContratSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        return response
    
    class Meta:
        model = Contrat
        fields = '__all__'
