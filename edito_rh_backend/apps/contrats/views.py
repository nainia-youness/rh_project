import sys
from .serializer import ContratSerializer
from .models import Contrat
from rest_framework import status
from rest_framework.response import Response
from common.api_metadata import get_metadata
from ..users.authentication import is_authenticated
from common.filter_parser import get_queryset
from rest_framework.views import APIView
from common.response_handler import handle_error, handle_successful_response
from django.http import Http404
from ..users.models import User
sys.path.insert(1, '../../common')


class ContratsAPIView(APIView):

    def get_User(self, user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise Http404

    def get(self, request):
        user_id = is_authenticated(self.request)
        contrats = Contrat.objects.all()
        contrats, max_pages, count = get_queryset(request, contrats)
        serializer = ContratSerializer(contrats, many=True)
        metadata = get_metadata('contrat', contrats, max_pages, count)
        # remove user_id and replace it with nom et prenom of user
        data = serializer.data
        for contrat in data:
            user_id = contrat['user_id']
            del contrat['user_id']
            user = self.get_User(user_id)
            contrat['user_nom'] = user.nom
            contrat['user_prenom'] = user.prenom
        key_values = [
            {'key': 'data', 'value': serializer.data},
            {'key': 'metadata', 'value': metadata},
        ]
        return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)

    def post(self, request):
        user_id = is_authenticated(self.request)
        request.data['user_id'] = user_id
        request.data['derniere_operation'] = 'Ajouter'
        serializer = ContratSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            key_values = [{'key': 'data', 'value': serializer.data}]
            return handle_successful_response(key_values=key_values, status=status.HTTP_201_CREATED)

        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)


class ContratAPIView(APIView):

    def get_object(self, id):
        try:
            return Contrat.objects.get(id=id)
        except Contrat.DoesNotExist:
            raise Http404

    def get(self, request, id):
        user_id = is_authenticated(self.request)
        contrat = self.get_object(id)
        serializer = ContratSerializer(contrat)
        key_values = [{'key': 'data', 'value': serializer.data}]
        return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)

    def put(self, request, id):
        user_id = is_authenticated(self.request)
        request.data['user_id'] = user_id
        request.data['derniere_operation'] = 'Modifier'
        contrat = self.get_object(id)
        serializer = ContratSerializer(contrat, data=request.data)
        if serializer.is_valid():
            serializer.save()
            key_values = [{'key': 'data', 'value': serializer.data}]
            return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)
        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        user_id = is_authenticated(self.request)
        contrat = self.get_object(id)
        contrat.delete()
        key_values = [{'key': 'message', 'value': 'contrat deleted'}]
        return handle_successful_response(key_values=key_values, status=status.HTTP_204_NO_CONTENT)
