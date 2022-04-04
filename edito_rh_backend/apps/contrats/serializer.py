from .models import Contrat
from rest_framework import serializers


class ContratSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contrat
        fields = '__all__'
