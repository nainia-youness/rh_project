import sys
from django.shortcuts import render
from .serializer import EntiteSerializer
from .models import Entite
from rest_framework import mixins
from rest_framework import generics

from common.filter_parser import get_filter


sys.path.insert(1, '../../common')


class EntitesView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin,
                  mixins.UpdateModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    serializer_class = EntiteSerializer
    queryset = Entite.objects.all()
    lookup_field = 'id'

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

        q = Entite.objects.all()
        if(filter is not None):
            q = q.filter(get_filter(filter))

        if id == None:
            if(sort_params is not None):
                sort = sort_params.split(',')
                q = q.order_by(*sort)
            if(limit is not None and offset is not None):
                q = q[int(offset):int(limit)]

        return q

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
