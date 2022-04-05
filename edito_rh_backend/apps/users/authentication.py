import jwt
import datetime
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import get_authorization_header


def create_access_token(user):
    payload = {
        'user_id': user.id,
        'user_nom': user.nom,
        'user_prenom': user.prenom,
        'exp': datetime.datetime.utcnow()+datetime.timedelta(minutes=60),  # normally max 1 min
        'iat': datetime.datetime.utcnow()
    }
    # iat= creation time
    return jwt.encode(payload, 'access_secret',
                      algorithm='HS256')


def create_refresh_token(user):
    payload = {
        'user_id': user.id,
        'user_nom': user.nom,
        'user_prenom': user.prenom,
        'exp': datetime.datetime.utcnow()+datetime.timedelta(days=7),
        'iat': datetime.datetime.utcnow()
    }
    # iat= creation time
    return jwt.encode(payload, 'refresh_secret',
                      algorithm='HS256')


def decode_access_token(token):
    try:
        payload = jwt.decode(token, 'access_secret', algorithms=['HS256'])
        return payload['user_id']
    except:
        raise AuthenticationFailed('Unauthenticated')


def decode_refresh_token(token):
    try:
        payload = jwt.decode(token, 'refresh_secret', algorithms=['HS256'])
        return payload['user_id']
    except:
        raise AuthenticationFailed('Unauthenticated')


def is_authenticated(request):
    auth = get_authorization_header(request).split()
    if auth and len(auth) == 2:
        token = auth[1].decode('utf-8')
        id = decode_access_token(token)
        return id
    else:
        raise AuthenticationFailed('unauthenticated')
