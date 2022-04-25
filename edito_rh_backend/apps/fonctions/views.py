

from django.http import Http404
from django.http import HttpResponse, JsonResponse
import sys
from rest_framework import mixins
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer

from ..users.models import User

from ..users.authentication import is_authenticated
from .models import Fonction
from .serializer import FonctionSerializer
import datetime
sys.path.insert(1, '../../common')

from common.filter_parser import get_filter, get_queryset
from common.api_metadata import APIMetadata, get_metadata
from common.response_handler import handle_error, handle_successful_response
from ..affectations.models import Affectation
from ..centres_cout.models import CentreCout
from ..contrats.models import Contrat
from ..directions.models import Direction
from ..variables.models import Variable
from ..employes.models import Employe,EmployesRubriques
from ..entites.models import Entite
from ..villes.models import Ville
from ..formules.models import Formule
from ..rubriques.models import Rubrique
from .models import Fonction

def initialize():
    # a = Affectation(designation='AGENCE MARRAKECH', description='AGENCE MARRAKECH',user_id=1)
    # a.save()
    # e = Entite(designation='SAPRESS', description='SAPRESS',user_id=1)
    # e.save()
    # v = Ville(nom='Marrakech',user_id=1)
    # v.save()
    # cc=CentreCout(designation='Logistique', description='Logistique',user_id=1)
    # cc.save()
    # c=Contrat(designation='CDI', description='Contrat a duree indeterminee',user_id=1)
    # c.save()
    # f=Fonction(designation='Achat', description='Achat',user_id=1)
    # f.save()
    # d=Direction(designation='DIRECTION LOGISTIQUE ET DEVELOPPEMENT', description='DIRECTION LOGISTIQUE ET DEVELOPPEMENT',user_id=1)
    # d.save()
    # r1=Rubrique(designation='prime1', description='prime1',user_id=1)
    # r1.save()
    # r2=Rubrique(designation='prime2', description='prime2',user_id=1)
    # r2.save()
    # v=Variable(designation='var1', valeur=5,user_id=1)
    # v.save()
    # f=Formule(designation='formule1', formule="if(var1==5){var1}",user_id=1)
    # f.save()
    # e=Employe(matricule=484, nom='Chakir', prenom='Mohamed', date_naissance='1994-01-01', sexe='M', 
    # cin='BK179415', date_entree= '2017-03-01', situation_familiale='Marié(e)', nombre_enfant=2, charge_familiale=2, 
    # adresse='RES El mehdi IMM B N°13 Sidi Maarouf ', nationalite='MAR', cnss=8000, salaire=1907802000, numero_compte= 5665, 
    # participation=4346,  date_sortie='2022-03-18', fonction_id=1, centre_cout_id=1, direction_id=1, ville_id=1, contrat_id=1, affectation_id=1, entite_id=1, delegue_id=1,user_id=1)
    # e.save()

    pass

initialize()

class FonctionsAPIView(APIView):

    def get_User(self, user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise Http404

    def get(self, request):
        user_id = is_authenticated(request)
        fonctions = Fonction.objects.all()
        metadata = get_metadata('fonction', fonctions)
        fonctions, max_pages, count = get_queryset(request, fonctions)
        serializer = FonctionSerializer(fonctions, many=True)

        # add maxPages
        if(max_pages is not None):
            metadata['max_pages'] = max_pages
        # add count
        if(count is not None):
            metadata['count'] = count
        # metadata = {
        #    'fields': metadata_generator.change_metadata_format(metadata_generator.get_serializer_info(serializer))
        # }
        # remove user_id and replace it with nom et prenom of user
        
        key_values = [
            {'key': 'data', 'value': serializer.data},
            {'key': 'metadata', 'value': metadata},
        ]
        return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)

    def post(self, request):
        user_id = is_authenticated(request)
        request.data['user'] = user_id
        request.data['derniere_operation'] = 'Ajouter'
        serializer = FonctionSerializer(
            data=request.data)
        if serializer.is_valid():
            serializer.save()
            key_values = [{'key': 'data', 'value': serializer.data}]
            return handle_successful_response(key_values=key_values, status=status.HTTP_201_CREATED)

        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)


class FonctionAPIView(APIView):

    def get_object(self, id):
        try:
            return Fonction.objects.get(id=id)
        except Fonction.DoesNotExist:
            raise Http404

    def get(self, request, id):
        user_id = is_authenticated(request)
        fonction = self.get_object(id)
        serializer = FonctionSerializer(fonction)
        key_values = [{'key': 'data', 'value': serializer.data}]
        return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)

    def put(self, request, id):
        user_id = is_authenticated(request)
        request.data['user'] = user_id
        request.data['derniere_operation'] = 'Modifier'
        fonction = self.get_object(id)
        serializer = FonctionSerializer(fonction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            key_values = [{'key': 'data', 'value': serializer.data}]
            return handle_successful_response(key_values=key_values, status=status.HTTP_200_OK)
        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        user_id = is_authenticated(request)
        fonction = self.get_object(id)
        fonction.delete()
        key_values = [{'key': 'message', 'value': 'fonction deleted'}]
        return handle_successful_response(key_values=key_values, status=status.HTTP_204_NO_CONTENT)


class FonctionsView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin,
                    mixins.UpdateModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    serializer_class = FonctionSerializer
    queryset = Fonction.objects.all()
    lookup_field = 'id'

    def get(self, request, id=None):
        user_id = is_authenticated(request)
        if id:
            return self.retrieve(request)
        return self.list(request)

    def post(self, request):
        user_id = is_authenticated(request)
        return self.create(request)

    def put(self, request, id=None):
        user_id = is_authenticated(request)
        return self.update(request, id)

    def delete(self, request, id=None):
        user_id = is_authenticated(request)
        return self.destroy(request, id)

    def get_queryset(self, id=None):

        filter = request.query_params.get('filter', None)
        # field param
        fields_params = request.query_params.get('fields', None)

        # sort param
        sort_params = request.query_params.get('sort', None)

        # limit and offset params
        limit = request.query_params.get('limit', None)
        offset = request.query_params.get('offset', None)
        # distinct param
        distinct_field = request.query_params.get('distinct', None)

        # apply params
        q = Fonction.objects.all()
        if(filter is not None):
            q = q.filter(get_filter(filter))

        if id == None:
            if(sort_params is not None):
                sort = sort_params.split(',')
                q = q.order_by(*sort)
            # if(distinct_field is not None):
            #fields = fields_params.split(',')
            #    q = q.distinct()
            if(limit is not None and offset is not None):
                q = q[int(offset):int(limit)]

        # if(len(fields) != 0):
        #    print("hhhhh")
        #    print(fields)

        #q = q.values('description')

        return q

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        metadata_generator = APIMetadata()
        metadata = {
            'fields': metadata_generator.change_metadata_format(metadata_generator.get_serializer_info(serializer))
        }

        response = {
            'data': serializer.data,
            'metadata': metadata
        }
        return Response(data=response, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def fonctions_list(request):

    if request.method == 'GET':
        fonctions = Fonction.objects.all()
        serializer = FonctionSerializer(fonctions, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = FonctionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def fonction_details(request, pk):
    try:
        fonction = Fonction.objects.get(pk=pk)
    except Fonction.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = FonctionSerializer(fonction)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = FonctionSerializer(fonction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        fonction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
