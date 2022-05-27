from .models import Traitement
from rest_framework import serializers
from ..users.serializer import UserSerializer

class TraitementSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        response['path']="/traitements/"+str(response['id'])+'/'
        return response
        
    class Meta:
        model = Traitement
        fields = '__all__'
