from .models import CentreCout
from rest_framework import serializers


class CentreCoutSerializer(serializers.ModelSerializer):

    class Meta:
        model = CentreCout
        fields = '__all__'
