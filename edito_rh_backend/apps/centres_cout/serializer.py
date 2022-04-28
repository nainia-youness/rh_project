from .models import CentreCout
from rest_framework import serializers
from ..users.serializer import UserSerializer

class CentreCoutSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        response['path']="/centres-cout/"+str(response['id'])+'/'
        return response
        
    class Meta:
        model = CentreCout
        fields = '__all__'
