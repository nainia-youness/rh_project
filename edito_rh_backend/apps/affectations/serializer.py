from .models import Affectation
from rest_framework import serializers


class AffectationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Affectation
        fields = '__all__'
