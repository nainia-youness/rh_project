import sys
from .serializer import AffectationSerializer
from .models import Affectation
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


class AffectationsAPIView(APIView):

    def get_User(self, user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise Http404

    def get(self, request):
        user_id = is_authenticated(request)
        affectations = Affectation.objects.all()
        metadata = get_metadata('affectation', affectations)
        affectations, max_pages, count = get_queryset(request, affectations)
        serializer = AffectationSerializer(affectations, many=True)
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
        serializer = AffectationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            key_values = [{'key': 'data', 'value': serializer.data}]
            return handle_successful_response(key_values=key_values, status=status.HTTP_201_CREATED)

        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)


class AffectationAPIView(APIView):

    def get_object(self, id):
        try:
            return Affectation.objects.get(id=id)
        except Affectation.DoesNotExist:
            raise Http404

    def get(self, request, id):
        user_id = is_authenticated(request)
        affectation = self.get_object(id)
        metadata = get_metadata('affectation', affectation,is_one=True)
        serializer = AffectationSerializer(affectation)
        key_values = [
            {'key': 'data', 'value': serializer.data},
            {'key': 'metadata', 'value': metadata},
            ]
        return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)

    def put(self, request, id):
        user_id = is_authenticated(request)
        request.data['user'] = user_id
        request.data['derniere_operation'] = 'Modifier'
        affectation = self.get_object(id)
        serializer = AffectationSerializer(affectation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            key_values = [{'key': 'data', 'value': serializer.data}]
            return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)
        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        user_id = is_authenticated(request)
        affectation = self.get_object(id)
        affectation.delete()
        key_values = [{'key': 'message', 'value': 'affectation deleted'}]
        return handle_successful_response(key_values=key_values, status=status.HTTP_204_NO_CONTENT)
