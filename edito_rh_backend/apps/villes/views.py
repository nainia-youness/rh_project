import sys
from .serializer import VilleSerializer
from .models import Ville
from rest_framework import status
from rest_framework.response import Response
from common.api_metadata import APIMetadata
from ..users.authentication import is_authenticated
from common.filter_parser import get_queryset
from rest_framework.views import APIView
from common.response_handler import handle_error, handle_successful_response
from django.http import Http404
sys.path.insert(1, '../../common')


class VillesAPIView(APIView):

    def get(self, request):
        user_id = is_authenticated(self.request)
        villes = Ville.objects.all()
        villes = get_queryset(request, villes)
        serializer = VilleSerializer(villes, many=True)
        metadata_generator = APIMetadata()
        metadata = {
            'fields': metadata_generator.change_metadata_format(metadata_generator.get_serializer_info(serializer))
        }
        key_values = [
            {'key': 'data', 'value': serializer.data},
            {'key': 'metadata', 'value': metadata},
        ]
        return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)

    def post(self, request):
        user_id = is_authenticated(self.request)
        request.data['user_id'] = user_id
        request.data['derniere_operation'] = 'Ajouter'
        serializer = VilleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            key_values = [{'key': 'data', 'value': serializer.data}]
            return handle_successful_response(key_values=key_values, status=status.HTTP_201_CREATED)

        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)


class VilleAPIView(APIView):

    def get_object(self, id):
        try:
            return Ville.objects.get(id=id)
        except Ville.DoesNotExist:
            raise Http404

    def get(self, request, id):
        user_id = is_authenticated(self.request)
        ville = self.get_object(id)
        serializer = VilleSerializer(ville)
        key_values = [{'key': 'data', 'value': serializer.data}]
        return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)

    def put(self, request, id):
        user_id = is_authenticated(self.request)
        request.data['user_id'] = user_id
        request.data['derniere_operation'] = 'Modifier'
        ville = self.get_object(id)
        serializer = VilleSerializer(ville, data=request.data)
        if serializer.is_valid():
            serializer.save()
            key_values = [{'key': 'data', 'value': serializer.data}]
            return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)
        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        user_id = is_authenticated(self.request)
        ville = self.get_object(id)
        ville.delete()
        key_values = [{'key': 'message', 'value': 'ville deleted'}]
        return handle_successful_response(key_values=key_values, status=status.HTTP_204_NO_CONTENT)
