import datetime
from django.http import HttpResponse, JsonResponse
from .models import Fonction
from fonctions.serializers import FonctionSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import mixins


class FonctionsView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin,
                    mixins.UpdateModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    serializer_class = FonctionSerializer
    queryset = Fonction.objects.all()
    lookup_field = 'id'

    def get(self, request, id=None):
        if id:
            return self.retrieve(request)
        return self.list(request)

    def post(self, request):
        return self.create(request)

    def put(self, request, id=None):
        return self.update(request, id)

    def delete(self, request, id=None):
        return self.destroy(request, id)


class FonctionAPIView(APIView):

    def get(self, request):
        fonctions = Fonction.objects.all()
        serializer = FonctionSerializer(fonctions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = FonctionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FonctionDetails(APIView):

    def get_object(self, id):
        try:
            return Fonction.objects.get(id=id)
        except Fonction.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, id):
        fonction = self.get_object(id)
        serializer = FonctionSerializer(fonction)
        return Response(serializer.data)

    def put(self, request, id):
        fonction = self.get_object(id)
        serializer = FonctionSerializer(fonction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        fonction = self.get_object(id)
        fonction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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
