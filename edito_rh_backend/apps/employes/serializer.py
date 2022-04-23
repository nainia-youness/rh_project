
from ..fonctions.serializer import FonctionSerializer
from ..centres_cout.serializer import CentreCoutSerializer
from ..directions.serializer import DirectionSerializer
from ..villes.serializer import VilleSerializer
from ..contrats.serializer import ContratSerializer
from ..affectations.serializer import AffectationSerializer
from ..entites.serializer import EntiteSerializer
from ..users.serializer import UserSerializer
from ..fonctions.models import Fonction
from .models import Employe,EmployesRubriques
from rest_framework import serializers

class EmployeSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        response['fonction'] = FonctionSerializer(instance.fonction).data
        response['centre_cout'] = CentreCoutSerializer(instance.centre_cout).data
        response['direction'] = DirectionSerializer(instance.direction).data
        response['ville'] = VilleSerializer(instance.ville).data
        response['contrat'] = ContratSerializer(instance.contrat).data
        response['affectation'] = AffectationSerializer(instance.affectation).data
        response['entite'] = EntiteSerializer(instance.entite).data
        return response

    class Meta:
        model = Employe
        fields = '__all__'


class EmployesRubriquesSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        return response
        
    class Meta:
        model = EmployesRubriques
        fields = '__all__'
