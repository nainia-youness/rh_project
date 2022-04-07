from .authentication import create_access_token, create_refresh_token, decode_access_token, decode_refresh_token
from rest_framework.views import APIView
from .models import User
from .serializer import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import get_authorization_header
from common.response_handler import handle_error, handle_successful_response
from django.http import Http404
# Create your views here.


class RegisterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        key_values = [{
            'key': 'data',
            'value': serializer.data
        }]
        return handle_successful_response(key_values=key_values, status=status.HTTP_201_CREATED)


class LoginView(APIView):

    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('User not found')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')

        access_token = create_access_token(user)
        refresh_token = create_refresh_token(user)

        #response = Response(status=status.HTTP_200_OK)
        #response.set_cookie(key='refreshToken',
        #                    value=refresh_token, httponly=True)
        #response.data = {
        #    'token': access_token
        #}
        key_values = [{
            'key': 'token',
            'value': access_token
        }]
        cookies=[{
            'key': 'refreshToken',
            'value': refresh_token
        }]
        return handle_successful_response(key_values=key_values,cookies=cookies,status=status.HTTP_200_OK)
        #return response


class UserView(APIView):

    def get(self, request):
        auth = get_authorization_header(request).split()
        # first should be the bearer then the token
        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            id = decode_access_token(token)
            user = User.objects.filter(id=id).first()
            serializer = UserSerializer(user)
            key_values = [{
                'key': 'data',
                'value': serializer.data
            }]
            return handle_successful_response(key_values=key_values,status=status.HTTP_200_OK)
            #return Response(serializer.data)
        else:
            raise AuthenticationFailed('unauthenticated')


class RefreshView(APIView):

    def post(self, request):
        refresh_token = request.COOKIES.get('refreshToken')
        id = decode_refresh_token(refresh_token)
        user = User.objects.filter(id=id).first()
        access_token = create_access_token(user)
        key_values = [{
                'key': 'token',
                'value': access_token
        }]
        return handle_successful_response(key_values=key_values,status=status.HTTP_200_OK)
        #return Response({
        #    'token': access_token
        #})


class LogoutView(APIView):

    def post(self, request):
        
        #response = Response()
        #response.delete_cookie(key="refreshToken")
        #response.data = {
        #    'message': 'success'
        #}
        key_values = [{
            'key': 'message',
            'value': 'success'
        }]
        res=handle_successful_response(key_values=key_values,status=status.HTTP_200_OK)
        res.delete_cookie(key="refreshToken")
        return res
        #return response
