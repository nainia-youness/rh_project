import string
import parser
import re


def lexer(exp):
    punc = "(),"

    s = list(exp)
    print([o if not o in punc else ' ' for o in s])
    return ''.join([o if not o in punc else ' ' for o in s]).split()


operators = ['eq', 'ne', 'lt', 'lte', 'gt', 'gte',
             'iexact', 'startsWith', 'icontains', 'contains']
exp = "or(and(lt(id,5),lt(id,7)),eq(id,9))"
valid_fields = ['id']
delimiters = ['(', ')', ',']
and_or = ['and', 'or']


def lexer_with_delimiters(exp):
    punc = '(),'
    result = []
    s = ''
    for c in exp:
        if(c not in punc):
            s += c
        else:
            if(s != ''):
                result.append(s)
            result.append(c)
            s = ''
    return result


def is_value_date(s):
    pattern_for_date = r"^20[0-2][0-9]-((0[1-9])|(1[0-2]))-([0-2][1-9]|3[0-1])$"

    if re.match(pattern_for_date, s) is not None:
        return True
    else:
        return False

# def is_value_time(s):


is_valid = True
tokens = lexer_with_delimiters(exp)
for i in range(len(tokens)):
    is_operator = tokens[i] in operators
    is_valid_field = tokens[i] in valid_fields
    is_delimiter = tokens[i] in delimiters
    is_and_or = tokens[i] in and_or
    is_numeric = tokens[i].isnumeric()
    is_date = is_value_date(tokens[i])
    if(not is_operator and not is_valid_field and not is_delimiter and not is_and_or and not is_numeric and not is_date):
        print(tokens[i])
        is_valid = False


print(is_valid)
