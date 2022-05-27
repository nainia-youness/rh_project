import sys

from django.http import Http404
from .serializer import TraitementSerializer
from .models import Traitement
from rest_framework import status
from rest_framework.response import Response
from common.api_metadata import get_metadata
from ..users.authentication import is_authenticated
from common.filter_parser import get_queryset
from rest_framework.views import APIView
from common.response_handler import handle_error, handle_successful_response
from ..users.models import User
sys.path.insert(1, '../../common')


class TraitementsAPIView(APIView):

    def get_User(self, user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise Http404

    def get(self, request):
        user_id = is_authenticated(request)
        traitements = Traitement.objects.all().order_by('-date_derniere_operation')
        metadata = get_metadata('traitement', traitements)
        traitements, max_pages, count = get_queryset(request, traitements)
        serializer = TraitementSerializer(traitements, many=True)
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
        #check if all traitements are false
        not_cloture_traitements= Traitement.objects.all().filter(is_cloture=False)
        serializer = TraitementSerializer(data=request.data)
        if serializer.is_valid():
            if(len(not_cloture_traitements)==0):
                serializer.save()
                key_values = [{'key': 'data', 'value': serializer.data}]
                return handle_successful_response(key_values=key_values, status=status.HTTP_201_CREATED)
            else:
                return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)
        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)


class TraitementAPIView(APIView):

    def get_object(self, id):
        try:
            return Traitement.objects.get(id=id)
        except Traitement.DoesNotExist:
            raise Http404

    def get(self, request, id):
        user_id = is_authenticated(request)
        traitement = self.get_object(id)
        #do the formulas TODO
        #if is_cloture==false
        #get all formules
        #get all parametres
        #get l'entite
        #for each employe de l'entite get his rubriques
        #for each  employe de l'entite get his fields (salaire ect...)
        #return this to frontend
        metadata = get_metadata('traitement', traitement,is_one=True)
        serializer = TraitementSerializer(traitement)
        key_values = [
            {'key': 'data', 'value': serializer.data},
            {'key': 'metadata', 'value': metadata},
            ]
        return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)

    def put(self, request, id):
        user_id = is_authenticated(request)
        request.data['user'] = user_id
        request.data['derniere_operation'] = 'Modifier'
        traitement = self.get_object(id)
        serializer = TraitementSerializer(traitement, data=request.data)
        if serializer.is_valid():
            serializer.save()
            key_values = [{'key': 'data', 'value': serializer.data}]
            return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)

        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        user_id = is_authenticated(request)
        traitement = self.get_object(id)
        traitement.delete()
        key_values = [{'key': 'message', 'value': 'traitement deleted'}]
        return handle_successful_response(key_values=key_values, status=status.HTTP_204_NO_CONTENT)
