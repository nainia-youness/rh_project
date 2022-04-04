from .models import Ville
from rest_framework import serializers


class VilleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ville
        fields = '__all__'
