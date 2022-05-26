import sys
from .serializer import FormuleSerializer,FormulesVariablesSerializer
from .models import Formule,FormulesVariables
from rest_framework import status
from rest_framework.response import Response
from common.api_metadata import get_metadata
from ..users.authentication import is_authenticated
from common.filter_parser import get_queryset
from rest_framework.views import APIView
from common.response_handler import handle_error, handle_successful_response
from django.http import Http404
from ..users.models import User
from ..variables.models import Variable
from ..variables.serializer import VariableSerializer
sys.path.insert(1, '../../common')


class FormulesAPIView(APIView):

    def get_User(self, user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise Http404

    def get(self, request):
        user_id = is_authenticated(request)
        formules = Formule.objects.all()
        metadata = get_metadata('formule', formules)
        formules, max_pages, count = get_queryset(request, formules)
        serializer = FormuleSerializer(formules, many=True)

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
        serializer = FormuleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            key_values = [{'key': 'data', 'value': serializer.data}]
            return handle_successful_response(key_values=key_values, status=status.HTTP_201_CREATED)

        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)


class FormuleAPIView(APIView):

    def get_object(self, id):
        try:
            return Formule.objects.get(id=id)
        except Formule.DoesNotExist:
            raise Http404

    def get_variable(self,variable_id):
        try:
            return Variable.objects.get(id=variable_id)
        except Variable.DoesNotExist:
            raise Http404       

    def get(self, request, id):
        user_id = is_authenticated(request)
        formule = self.get_object(id)
        metadata = get_metadata('formule', formule,is_one=True)
        serializer = FormuleSerializer(formule)
        data=serializer.data
        #add variables
        variables=[]
        for variable_id in data['variables']:
            ser_data=VariableSerializer(self.get_variable(variable_id)).data     
            #ser_data['path']='/variables/{id}/'.format(id=ser_data['id']) 
            variables.append(ser_data)
        data['variables']=variables

        key_values = [
            {'key': 'data', 'value': data},
            {'key': 'metadata', 'value': metadata},
            ]
        return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)

    def put(self, request, id):
        user_id = is_authenticated(request)
        request.data['user'] = user_id
        request.data['derniere_operation'] = 'Modifier'
        formule = self.get_object(id)
        serializer = FormuleSerializer(formule, data=request.data)
        if serializer.is_valid():
            serializer.save()
            data=serializer.data
            #add variables
            variables=[]
            for variable_id in data['variables']:
                ser_data=VariableSerializer(self.get_variable(variable_id)).data     
                variables.append(ser_data)

            data['variables']=variables
            key_values = [{'key': 'data', 'value': data}]
            return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)
        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        user_id = is_authenticated(request)
        formule = self.get_object(id)
        formule.delete()
        key_values = [{'key': 'message', 'value': 'formule deleted'}]
        return handle_successful_response(key_values=key_values, status=status.HTTP_204_NO_CONTENT)


class FormulesVariablesAPIView(APIView):

    def get_formule(self,formule_id):
        try:
            return Formule.objects.get(id=formule_id)
        except Formule.DoesNotExist:
            raise Http404

    def get_variable(self,variable_id):
        try:
            return Variable.objects.get(id=variable_id)
        except Variable.DoesNotExist:
            raise Http404

    def get_object(self,formule_id, variable_id):
        formule=self.get_formule(formule_id)
        variable=self.get_variable(variable_id)
        try:
            return FormulesVariables.objects.get(formule=formule,variable=variable)
        except FormulesVariables.DoesNotExist:
            raise Http404

    def get(self, request, formule_id, variable_id):
        user_id = is_authenticated(request)
        formuleVariable = self.get_object(formule_id, variable_id)
        serializer = FormulesVariablesSerializer(formuleVariable)
        data=serializer.data
        key_values = [{'key': 'data', 'value': data}]
        return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)

    def put(self, request,formule_id, variable_id):
        user_id = is_authenticated(request)
        request.data['user'] = user_id
        request.data['derniere_operation'] = 'Ajouter'
        request.data['formule']=formule_id
        request.data['variable']=variable_id
        serializer = FormulesVariablesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            key_values = [{'key': 'data', 'value': serializer.data}]
            return handle_successful_response(key_values=key_values, status=status.HTTP_201_CREATED)
        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)

    def delete(self, request, formule_id, variable_id):
        user_id = is_authenticated(request)
        formuleVariable = self.get_object(formule_id, variable_id)
        formuleVariable.delete()
        key_values = [{'key': 'message', 'value': 'formule variable deleted'}]
        return handle_successful_response(key_values=key_values, status=status.HTTP_204_NO_CONTENT)