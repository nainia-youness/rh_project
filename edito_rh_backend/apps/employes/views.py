import sys

from ..rubriques.serializer import RubriqueSerializer
from .serializer import EmployeSerializer,EmployesRubriquesSerializer
from .models import Employe
from rest_framework import status
from rest_framework.response import Response
from common.api_metadata import get_metadata
from ..users.authentication import is_authenticated
from common.filter_parser import get_queryset
from rest_framework.views import APIView
from common.response_handler import handle_error, handle_successful_response
from django.http import Http404
from ..users.models import User
from .models import EmployesRubriques
from ..rubriques.models import Rubrique
sys.path.insert(1, '../../common')


class EmployesAPIView(APIView):

    def get_object(self, id):
        try:
            return Employe.objects.get(id=id)
        except Employe.DoesNotExist:
            raise Http404
        
    def get_User(self, user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise Http404

    def get(self, request):
        user_id = is_authenticated(request)
        employes = Employe.objects.all()
        metadata = get_metadata('employe', employes)
        employes, max_pages, count = get_queryset(request, employes)
        serializer = EmployeSerializer(employes, many=True)

        # add maxPages
        if(max_pages is not None):
            metadata['max_pages'] = max_pages
        # add count
        if(count is not None):
            metadata['count'] = count
        # add delegue
        for employe in serializer.data:
            try:
                delegue=self.get_object(employe['delegue'])
                delegue=EmployeSerializer(delegue)
                delegue=change_delegue_format(delegue.data)
                employe['delegue']=delegue
            except:
                pass
        key_values = [
            {'key': 'data', 'value': serializer.data},
            {'key': 'metadata', 'value': metadata},
        ]
        return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)

    def post(self, request):
        user_id = is_authenticated(request)
        request.data['user'] = user_id
        request.data['derniere_operation'] = 'Ajouter'
        serializer = EmployeSerializer(data=request.data)

        if serializer.is_valid():
            employe=serializer.save()
            #add rubriques
            rubriques = Rubrique.objects.all()
            for rubrique in rubriques:
                rubriqueEmploye = EmployesRubriques(rubrique=rubrique, employe=employe,montant=0.00,derniere_operation='Ajouter')
                rubriqueEmploye.save()
            key_values = [{'key': 'data', 'value': serializer.data}]
            return handle_successful_response(key_values=key_values, status=status.HTTP_201_CREATED)

        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)


class EmployeAPIView(APIView):

    def get_object(self, id):
        try:
            return Employe.objects.get(id=id)
        except Employe.DoesNotExist:
            raise Http404

    def get_rubrique(self,id):
        try:
            return Rubrique.objects.get(id=id)
        except Rubrique.DoesNotExist:
            raise Http404
    
    def get_employe_rubriques(self,employe_id, rubrique_id):
        try:
            employe=Employe.objects.get(id=employe_id)
        except Employe.DoesNotExist:
            raise Http404
        try:
            rubrique=Rubrique.objects.get(id=rubrique_id)
        except Rubrique.DoesNotExist:
            raise Http404
        try:
            return EmployesRubriques.objects.get(employe=employe,rubrique=rubrique)
        except EmployesRubriques.DoesNotExist:
            raise Http404

    def get(self, request, id):
        user_id = is_authenticated(request)
        employe = self.get_object(id)
        metadata = get_metadata('employe', employe,is_one=True)
        serializer = EmployeSerializer(employe)
        data=serializer.data
        #add delegue
        delegue=change_delegue_format(EmployeSerializer(employe.delegue).data)
        data['delegue']=delegue
        #add rubriques
        rubriques=[]
        for rubrique_id in data['rubriques']:
            ser_data=RubriqueSerializer(self.get_rubrique(rubrique_id)).data
            employeRubrique = self.get_employe_rubriques(data['id'], rubrique_id)
            ser_data['montant']=employeRubrique.montant
            rubriques.append(ser_data)
            
        data['rubriques']=rubriques
        key_values = [
            {'key': 'data', 'value': data},
            {'key': 'metadata', 'value': metadata},
            ]
        return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)

    def put(self, request, id):
        user_id = is_authenticated(request)
        request.data['user'] = user_id
        request.data['derniere_operation'] = 'Modifier'
        employe = self.get_object(id)
        serializer = EmployeSerializer(employe, data=request.data)
        if serializer.is_valid():
            serializer.save()
            key_values = [{'key': 'data', 'value': serializer.data}]
            return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)
        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        user_id = is_authenticated(request)
        employe = self.get_object(id)
        employe.delete()
        key_values = [{'key': 'message', 'value': 'ville deleted'}]
        return handle_successful_response(key_values=key_values, status=status.HTTP_204_NO_CONTENT)


def change_delegue_format(delegue):
    if(not 'id' in delegue): return None
    return {
        'id':delegue['id'],
        'nom':delegue['nom'],
        'prenom':delegue['prenom'],
        'matricule':delegue['matricule'],
        'path':'/employés/'+str(delegue['id'])+'/'
    }

class EmployesRubriquesAPIView(APIView):

    def get_object(self,employe_id, rubrique_id):
        try:
            employe=Employe.objects.get(id=employe_id)
        except Employe.DoesNotExist:
            raise Http404
        try:
            rubrique=Rubrique.objects.get(id=rubrique_id)
        except Rubrique.DoesNotExist:
            raise Http404
        try:
            return EmployesRubriques.objects.get(employe=employe,rubrique=rubrique)
        except EmployesRubriques.DoesNotExist:
            raise Http404

    def get(self, request, employe_id, rubrique_id):
        user_id = is_authenticated(request)
        employeRubrique = self.get_object(employe_id, rubrique_id)
        serializer = EmployesRubriquesSerializer(employeRubrique)
        data=serializer.data
        key_values = [{'key': 'data', 'value': data}]
        return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)

    def put(self, request, employe_id, rubrique_id):
        user_id = is_authenticated(request)
        request.data['user_id'] = user_id
        request.data['derniere_operation'] = 'Modifier'
        request.data['employe']=employe_id
        request.data['rubrique']=rubrique_id
        employeRubrique = self.get_object(employe_id, rubrique_id)
        serializer = EmployesRubriquesSerializer(employeRubrique, data=request.data)
        if serializer.is_valid():
            serializer.save()
            key_values = [{'key': 'data', 'value': serializer.data}]
            return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)
        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)

    def delete(self, request, employe_id, rubrique_id):
        user_id = is_authenticated(request)
        employeRubrique = self.get_object(employe_id, rubrique_id)
        employeRubrique.delete()
        key_values = [{'key': 'message', 'value': 'ville deleted'}]
        return handle_successful_response(key_values=key_values, status=status.HTTP_204_NO_CONTENT)