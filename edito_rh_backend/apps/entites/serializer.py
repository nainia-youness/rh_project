from .models import Entite
from rest_framework import serializers
from ..users.serializer import UserSerializer

class EntiteSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        response['path']="/entités/"+str(response['id'])+'/'
        return response
        
    class Meta:
        model = Entite
        fields = '__all__'
