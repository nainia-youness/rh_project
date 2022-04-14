import sys

from django.http import Http404
from .serializer import EntiteSerializer
from .models import Entite
from rest_framework import status
from rest_framework.response import Response
from common.api_metadata import APIMetadata
from ..users.authentication import is_authenticated
from common.filter_parser import get_queryset
from rest_framework.views import APIView
from common.response_handler import handle_error, handle_successful_response
from ..users.models import User
sys.path.insert(1, '../../common')


class EntitesAPIView(APIView):

    def get_User(self, user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise Http404

    def get(self, request):
        user_id = is_authenticated(self.request)
        entites = Entite.objects.all()
        entites, max_pages, count = get_queryset(request, entites)
        serializer = EntiteSerializer(entites, many=True)
        metadata_generator = APIMetadata()
        metadata = {
            'fields': metadata_generator.change_metadata_format(metadata_generator.get_serializer_info(serializer))
        }
        # add maxPages
        if(max_pages is not None):
            metadata['max_pages'] = max_pages
        # add count
        if(count is not None):
            metadata['count'] = count
        # remove user_id and replace it with nom et prenom of user
        data = serializer.data
        for entite in data:
            user_id = entite['user_id']
            del entite['user_id']
            user = self.get_User(user_id)
            entite['user_nom'] = user.nom
            entite['user_prenom'] = user.prenom

        key_values = [
            {'key': 'data', 'value': serializer.data},
            {'key': 'metadata', 'value': metadata},
        ]
        return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)

    def post(self, request):
        user_id = is_authenticated(self.request)
        request.data['user_id'] = user_id
        request.data['derniere_operation'] = 'Ajouter'
        serializer = EntiteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            key_values = [{'key': 'data', 'value': serializer.data}]
            return handle_successful_response(key_values=key_values, status=status.HTTP_201_CREATED)

        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)


class EntiteAPIView(APIView):

    def get_object(self, id):
        try:
            return Entite.objects.get(id=id)
        except Entite.DoesNotExist:
            raise Http404

    def get(self, request, id):
        user_id = is_authenticated(self.request)
        entite = self.get_object(id)
        serializer = EntiteSerializer(entite)
        key_values = [{'key': 'data', 'value': serializer.data}]
        return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)

    def put(self, request, id):
        user_id = is_authenticated(self.request)
        request.data['user_id'] = user_id
        request.data['derniere_operation'] = 'Modifier'
        entite = self.get_object(id)
        serializer = EntiteSerializer(entite, data=request.data)
        if serializer.is_valid():
            serializer.save()
            key_values = [{'key': 'data', 'value': serializer.data}]
            return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)

        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        user_id = is_authenticated(self.request)
        entite = self.get_object(id)
        entite.delete()
        key_values = [{'key': 'message', 'value': 'entite deleted'}]
        return handle_successful_response(key_values=key_values, status=status.HTTP_204_NO_CONTENT)
