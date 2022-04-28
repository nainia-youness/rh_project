from .models import Affectation
from rest_framework import serializers
from ..users.serializer import UserSerializer

class AffectationSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        response['path']="/affectations/"+str(response['id'])+'/'
        return response
        
    class Meta:
        model = Affectation
        fields = '__all__'
