from wsgiref import validate
from .models import Fonction
from rest_framework import serializers


class FonctionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Fonction
        fields = '__all__'
