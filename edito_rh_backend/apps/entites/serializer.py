from .models import Entite
from rest_framework import serializers


class EntiteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Entite
        fields = '__all__'
