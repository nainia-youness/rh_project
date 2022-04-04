import sys
from django.shortcuts import render
from .serializer import VilleSerializer
from .models import Ville
from rest_framework import mixins
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from common.api_metadata import APIMetadata
from common.filter_parser import get_filter


sys.path.insert(1, '../../common')


class VillesView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin,
                 mixins.UpdateModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    serializer_class = VilleSerializer
    queryset = Ville.objects.all()
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

    def get_queryset(self, id=None):

        filter = self.request.query_params.get('filter')
        # field param
        fields_params = self.request.query_params.get('fields', None)
        #fields = fields_params.split(',')
        # sort param
        sort_params = self.request.query_params.get('sort', None)
        # limit and offset params
        limit = self.request.query_params.get('limit', None)
        offset = self.request.query_params.get('offset', None)
        # distinct param
        distinct_field = self.request.query_params.get('distinct', None)

        # apply params

        q = Ville.objects.all()
        if(filter is not None):
            q = q.filter(get_filter(filter))

        if id == None:
            if(sort_params is not None):
                sort = sort_params.split(',')
                q = q.order_by(*sort)
            if(limit is not None and offset is not None):
                q = q[int(offset):int(limit)]

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
