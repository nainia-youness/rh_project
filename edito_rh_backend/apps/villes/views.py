import sys
from .serializer import VilleSerializer
from .models import Ville
from rest_framework import status
from rest_framework.response import Response
from common.api_metadata import APIMetadata
from ..users.authentication import is_authenticated
from common.filter_parser import get_queryset
from rest_framework.views import APIView

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
        response = {
            'data': serializer.data,
            'metadata': metadata
        }
        return Response(data=response, status=status.HTTP_200_OK)

    def post(self, request):
        user_id = is_authenticated(self.request)
        request.data['user_id'] = user_id
        request.data['derniere_operation'] = 'Ajouter'
        serializer = VilleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VilleAPIView(APIView):

    def get_object(self, id):
        try:
            return Ville.objects.get(id=id)
        except Ville.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, id):
        user_id = is_authenticated(self.request)
        ville = self.get_object(id)
        serializer = VilleSerializer(ville)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        user_id = is_authenticated(self.request)
        request.data['user_id'] = user_id
        request.data['derniere_operation'] = 'Modifier'
        ville = self.get_object(id)
        serializer = VilleSerializer(ville, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        user_id = is_authenticated(self.request)
        ville = self.get_object(id)
        ville.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
