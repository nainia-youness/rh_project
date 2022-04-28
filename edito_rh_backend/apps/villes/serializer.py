from .models import Ville
from rest_framework import serializers
from ..users.serializer import UserSerializer

class VilleSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        response['path']="/villes/"+str(response['id'])+'/'
        return response

    class Meta:
        model = Ville
        fields = '__all__'
