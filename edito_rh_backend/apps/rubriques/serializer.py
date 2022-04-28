from .models import Rubrique
from rest_framework import serializers
from ..users.serializer import UserSerializer

class RubriqueSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        response['path']="/rubriques/"+str(response['id'])+'/'
        return response
        
    class Meta:
        model = Rubrique
        fields = '__all__'