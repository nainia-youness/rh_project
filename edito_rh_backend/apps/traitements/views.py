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
from ..formules.models import Formule
from ..formules.serializer import FormuleSerializer
from ..variables.models import Variable
from ..employes.models import Employe,EmployesRubriques
from ..rubriques.models import Rubrique
from ..entites.models import Entite
from ..variables.serializer import VariableSerializer
from ..employes.serializer import EmployeSerializer,EmployesRubriquesSerializer
from ..rubriques.serializer import RubriqueSerializer
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
        #return only traitements that are in the specified entity
        entite=request.GET.get('entite')
        traitements=filter_entite(traitements,entite)
        
        metadata = get_metadata('traitement', traitements)
        traitements, max_pages, count = get_queryset(request, traitements)
        serializer = TraitementSerializer(traitements, many=True)

        #i need only those in the entite
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



def filter_entite(traitements,entite):
    if(entite):
            entites=list(Entite.objects.all().filter(designation=entite))
            if(len(entites)!=0):
                entite_id=entites[0].id
                if(entite_id):
                    traitements=traitements.filter(entite_id=entite_id)
    return traitements


class TraitementAPIView(APIView):

    def get_object(self, id):
        try:
            return Traitement.objects.get(id=id)
        except Traitement.DoesNotExist:
            raise Http404

    def get_rubrique(self,id):
        try:
            return Rubrique.objects.get(id=id)
        except Rubrique.DoesNotExist:
            raise Http404
    def get_variable(self,variable_id):
        try:
            return Variable.objects.get(id=variable_id)
        except Variable.DoesNotExist:
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
        traitement = self.get_object(id)
        is_cloture=traitement.is_cloture
        entite=request.GET.get('entite')
        metadata = get_metadata('traitement', traitement,is_one=True)
        if(is_cloture==False):
            result={}
            #TODO
            #get all formules
            formules=Formule.objects.all()
            formules_serializer=FormuleSerializer(formules, many=True)
            formules_data=formules_serializer.data
            #add all variables
            for formule_id in range(len(formules_data)):
                variables=[]
                for variable_id in formules_data[formule_id]['variables']:
                    ser_data=VariableSerializer(self.get_variable(variable_id)).data     
                    variables.append(ser_data)
                formules_data[formule_id]['variables']=variables
            #get all employes de l'entite
            employes=Employe.objects.all()
            employes=filter_entite(employes,entite)
            employes_serializer = EmployeSerializer(employes, many=True)
            employes_data=employes_serializer.data
            #add all rubriques
            for employe_id in range(len(employes_data)):
                rubriques=[]
                for rubrique_id in employes_data[employe_id]['rubriques']:
                    ser_data=RubriqueSerializer(self.get_rubrique(rubrique_id)).data
                    employeRubrique = self.get_employe_rubriques(employes_data[employe_id]['id'], rubrique_id)
                    ser_data['montant']=employeRubrique.montant
                    rubriques.append(ser_data)
                employes_data[employe_id]['rubriques']=rubriques
            #return this to frontend
            result['formules']=formules_data
            result['employes']=employes_data
            key_values = [
                {'key': 'data', 'value': result},
                {'key': 'metadata', 'value': metadata},
            ]
            return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)    
        else:
            #look in history
            print('trueeeeeeeeeeee')
            pass

            
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
