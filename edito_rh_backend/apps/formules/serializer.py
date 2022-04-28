from rest_framework import serializers
from ..users.serializer import UserSerializer
from .models import Formule
from .models import FormulesVariables

class FormuleSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        response['path']="/formules/"+str(response['id'])+'/'
        return response
        
    class Meta:
        model = Formule
        fields = '__all__'


class FormulesVariablesSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        return response
        
    class Meta:
        model = FormulesVariables
        fields = '__all__'
