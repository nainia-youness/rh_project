import sys

from django.http import Http404
from .serializer import RubriqueSerializer
from .models import Rubrique
from rest_framework import status
from rest_framework.response import Response
from common.api_metadata import get_metadata
from ..users.authentication import is_authenticated
from common.filter_parser import get_queryset
from rest_framework.views import APIView
from common.response_handler import handle_error, handle_successful_response
from ..users.models import User
from ..employes.models import Employe,EmployesRubriques
sys.path.insert(1, '../../common')


class RubriquesAPIView(APIView):

    def get_User(self, user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise Http404

    def get(self, request):
        user_id = is_authenticated(request)
        rubriques = Rubrique.objects.all()
        metadata = get_metadata('rubrique', rubriques)
        rubriques, max_pages, count = get_queryset(request, rubriques)
        serializer = RubriqueSerializer(rubriques, many=True)
        # add maxPages
        if(max_pages is not None):
            metadata['max_pages'] = max_pages
        # add count
        if(count is not None):
            metadata['count'] = count

        key_values = [
            {'key': 'data', 'value': serializer.data},
            {'key': 'metadata', 'value': metadata},
        ]
        return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)

    def post(self, request):
        user_id = is_authenticated(request)
        request.data['user'] = user_id
        request.data['derniere_operation'] = 'Ajouter'
        serializer = RubriqueSerializer(data=request.data)
        if serializer.is_valid():
            rubrique=serializer.save()
            employes = Employe.objects.all()
            for employe in employes:
                employeRubrique = EmployesRubriques(rubrique=rubrique, employe=employe,montant=0.00,derniere_operation='Ajouter')
                employeRubrique.save()
            key_values = [{'key': 'data', 'value': serializer.data}]
            return handle_successful_response(key_values=key_values, status=status.HTTP_201_CREATED)

        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)


class RubriqueAPIView(APIView):

    def get_object(self, id):
        try:
            return Rubrique.objects.get(id=id)
        except Rubrique.DoesNotExist:
            raise Http404

    def get(self, request, id):
        user_id = is_authenticated(request)
        rubrique = self.get_object(id)
        metadata = get_metadata('rubrique', rubrique,is_one=True)
        serializer = RubriqueSerializer(rubrique)
        key_values = [
            {'key': 'data', 'value': serializer.data},
            {'key': 'metadata', 'value': metadata},
            ]
        return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)

    def put(self, request, id):
        user_id = is_authenticated(request)
        request.data['user'] = user_id
        request.data['derniere_operation'] = 'Modifier'
        rubrique = self.get_object(id)
        serializer = RubriqueSerializer(rubrique, data=request.data)
        if serializer.is_valid():
            serializer.save()
            key_values = [{'key': 'data', 'value': serializer.data}]
            return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)

        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        user_id = is_authenticated(request)
        rubrique = self.get_object(id)
        rubrique.delete()
        key_values = [{'key': 'message', 'value': 'rubrique deleted'}]
        return handle_successful_response(key_values=key_values, status=status.HTTP_204_NO_CONTENT)
