from django.db.models import Q


# 'icontains' case insensitive
# eq exact match
# iexact case insensitive equal
operators = ['eq', 'ne', 'lt', 'lte', 'gt', 'gte',
             'iexact', 'startsWith', 'icontains', 'contains', 'year', 'month', 'day']


def lexer(exp):
    punc = "(),"

    s = list(exp)
    return ''.join([o if not o in punc else ' ' for o in s]).split()


def parse(tokens):

    tokens.reverse()

    i = 0
    len_list = len(tokens)
    while(i < len_list):
        token = tokens[i]
        if((token in operators) or token == 'and' or token == 'or'):
            exp1 = {
                'left': tokens[i-1],
                'right': tokens[i-2],
                'operator': token
            }

            tokens.pop(i)
            tokens.pop(i-1)
            tokens.pop(i-2)
            i -= 2
            tokens.insert(i, exp1)
            len_list = len(tokens)

        i += 1
    return tokens[0]


def get_filter(exp):
    tokens = lexer(exp)
    parsed_exp = parse(tokens)
    if(parsed_exp['operator'] != 'or' and parsed_exp['operator'] != 'and'):
        return simple_filter(parsed_exp)
    else:
        return operator_filter(parsed_exp)


def operator_filter(exp):

    if(isinstance(exp, Q)):
        return exp

    if(not isinstance(exp['left'], Q)):
        is_left_operator = (exp['left']['operator'] ==
                            'or') or (exp['left']['operator'] == 'and')
    else:
        is_left_operator = True
    if(not isinstance(exp['right'], Q)):
        is_right_operator = (exp['right']['operator'] ==
                             'or') or (exp['right']['operator'] == 'and')
    else:
        is_right_operator = True

    if((not is_left_operator and not is_right_operator) or (isinstance(exp['right'], Q)) or (isinstance(exp['left'], Q))):
        return operator_filter(simple_operator_filter(exp))

    if(is_right_operator and not is_left_operator):
        right = operator_filter(exp['right'])
        left = exp['left']
    elif(is_left_operator and not is_right_operator):
        left = operator_filter(exp['left'])
        right = exp['right']

    if(is_right_operator and is_left_operator):
        right = operator_filter(exp['right'])
        left = operator_filter(exp['left'])

    r = {
        'left': left,
        'right': right,
        'operator': exp['operator']
    }

    return operator_filter(r)


# both left and right are simple filters
def simple_operator_filter(exp):
    if(not isinstance(exp['right'], Q)):
        right_filter = simple_filter(exp['right'])
    else:
        right_filter = exp['right']
    if(not isinstance(exp['left'], Q)):
        left_filter = simple_filter(exp['left'])
    else:
        left_filter = exp['left']

    if(exp['operator'] == 'and'):
        return (left_filter & right_filter)
    elif(exp['operator'] == 'or'):
        return (left_filter | right_filter)


def simple_filter(exp):
    parameters_dict = {}
    left = exp['left']
    if(exp['operator'] != 'eq'):
        left += ('__'+exp['operator'])

    parameters_dict[left] = exp['right']

    return Q(**parameters_dict)


def get_queryset(request, query):
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

    if(filter is not None):
        query = query.filter(get_filter(filter))

    max_pages = None

    if(sort_params is not None):
        sort = sort_params.split(',')
        query = query.order_by(*sort)
    # if(distinct_field is not None):
    #fields = fields_params.split(',')
    #    query = query.distinct()
    if(limit is not None and offset is not None):
        count = query.count()
        query = query[int(offset):int(limit)]

        max_pages = count//int(limit)
        if(max_pages != 1):
            max_pages += 1

    # if(len(fields) != 0):
    #    print("hhhhh")
    #    print(fields)

    #query = query.values('description')

    return query, max_pages, count
