
from ..fonctions.serializer import FonctionSerializer
from ..centres_cout.serializer import CentreCoutSerializer
from ..directions.serializer import DirectionSerializer
from ..villes.serializer import VilleSerializer
from ..contrats.serializer import ContratSerializer
from ..affectations.serializer import AffectationSerializer
from ..entites.serializer import EntiteSerializer
from ..users.serializer import UserSerializer
from ..fonctions.models import Fonction
from .models import Employe
from rest_framework import serializers

class EmployeSerializer(serializers.ModelSerializer):
    fonction=FonctionSerializer(read_only=True,many=False)
    centre_cout=CentreCoutSerializer(read_only=True,many=False)
    direction=DirectionSerializer(read_only=True,many=False)
    ville=VilleSerializer(read_only=True,many=False)
    contrat=ContratSerializer(read_only=True,many=False)
    affectation=AffectationSerializer(read_only=True,many=False)
    entite=EntiteSerializer(read_only=True,many=False)
    user=UserSerializer(read_only=True,many=False)
    #delegue_nom=serializers.CharField(source='delegue.nom')

    class Meta:
        model = Employe
        fields = '__all__'
    #    extra_fields = ['delegue_nom']
