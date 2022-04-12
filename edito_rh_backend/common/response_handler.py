from rest_framework.response import Response
from rest_framework.views import exception_handler


def handle_successful_response(key_values=[], status=None, cookies=[]):
    response = {
        'status': code_status[status],
        'code': status,
        "isSuccessful": True
    }
    if(len(key_values) != 0):
        for key_value in key_values:
            response[key_value['key']] = key_value['value']

    res = Response(data=response, status=status)
    if(len(cookies) != 0):
        for cookie in cookies:
            res.set_cookie(key=cookie['key'],
                           value=cookie['value'], httponly=True)
    return res


def handle_error(message, statuscode):
    error = {
        "code": statuscode,
        "status": code_status[statuscode],
        "detail": message,
        "isSuccessful": False
    }
    return Response(data=error, status=statuscode)


def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    # Now add the HTTP status code to the response.
    if response is not None:
        response.data['code'] = response.status_code
        response.data['status'] = code_status[response.status_code]
        response.data['isSuccessful'] = False

    return response


code_status = {
    100: 'CONTINUE',
    101: 'SWITCHING_PROTOCOLS',
    200: 'OK',
    201: 'CREATED',
    202: 'ACCEPTED',
    203: 'NON_AUTHORITATIVE_INFORMATION',
    204: 'NO_CONTENT',
    205: 'RESET_CONTENT',
    206: 'PARTIAL_CONTENT',
    207: 'MULTI_STATUS',
    208: 'ALREADY_REPORTED',
    226: 'IM_USED',
    300: 'MULTIPLE_CHOICES',
    301: 'MOVED_PERMANENTLY',
    302: 'FOUND',
    303: 'SEE_OTHER',
    304: 'NOT_MODIFIED',
    305: 'USE_PROXY',
    306: 'RESERVED',
    307: 'TEMPORARY_REDIRECT',
    308: 'PERMANENT_REDIRECT',
    400: 'BAD_REQUEST',
    401: 'UNAUTHORIZED',
    402: 'PAYMENT_REQUIRED',
    403: 'FORBIDDEN',
    404: 'NOT_FOUND',
    405: 'METHOD_NOT_ALLOWED',
    406: 'NOT_ACCEPTABLE',
    407: 'PROXY_AUTHENTICATION_REQUIRED',
    408: 'REQUEST_TIMEOUT',
    409: 'CONFLICT',
    410: 'GONE',
    411: 'LENGTH_REQUIRED',
    412: 'PRECONDITION_FAILED',
    413: 'REQUEST_ENTITY_TOO_LARGE',
    414: 'REQUEST_URI_TOO_LONG',
    415: 'UNSUPPORTED_MEDIA_TYPE',
    416: 'REQUESTED_RANGE_NOT_SATISFIABLE',
    417: 'EXPECTATION_FAILED',
    422: 'UNPROCESSABLE_ENTITY',
    423: 'LOCKED',
    424: 'FAILED_DEPENDENCY',
    426: 'UPGRADE_REQUIRED',
    428: 'PRECONDITION_REQUIRED',
    429: 'TOO_MANY_REQUESTS',
    431: 'REQUEST_HEADER_FIELDS_TOO_LARGE',
    451: 'UNAVAILABLE_FOR_LEGAL_REASONS',
    500: 'INTERNAL_SERVER_ERROR',
    501: 'NOT_IMPLEMENTED',
    502: 'BAD_GATEWAY',
    503: 'SERVICE_UNAVAILABLE',
    504: 'GATEWAY_TIMEOUT',
    505: 'VERSION_NOT_SUPPORTED',
    506: 'VARIANT_ALSO_NEGOTIATES',
    507: 'INSUFFICIENT_STORAGE',
    508: 'LOOP_DETECTED',
    509: 'BANDWIDTH_LIMIT_EXCEEDED',
    510: 'NOT_EXTENDED',
    511: 'NETWORK_AUTHENTICATION_REQUIRED'
}
