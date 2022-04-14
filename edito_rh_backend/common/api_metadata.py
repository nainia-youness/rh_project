from rest_framework.schemas.openapi import AutoSchema
from rest_framework.metadata import SimpleMetadata


class APIMetadata(SimpleMetadata):
    """Extended metadata generator."""

    def get_field_info(self, field):
        field_info = super().get_field_info(field)

        # Add extra validators using the OpenAPI schema generator
        validators = {}
        AutoSchema()._map_field_validators(field, validators)
        extra_validators = ['format', 'pattern']
        for validator in extra_validators:
            if validators.get(validator, None):
                field_info[validator] = validators[validator]

        # Add additional data from serializer
        field_info['initial'] = field.initial
        field_info['field_name'] = field.field_name
        field_info['write_only'] = field.write_only

        return field_info

    def change_metadata_format(self, fields):
        result = []
        for key in fields:
            result.append(fields[key])
        return result


def get_metadata(model, query, max_pages, count):
    result = {}
    fields = None
    if(model == 'fonction'):
        fields = fonction_metadata(query)
    elif(model == 'ville'):
        fields = ville_metadata(query)
    elif(model == 'entite'):
        fields = entite_metadata(query)
    elif(model == 'direction'):
        fields = direction_metadata(query)
    elif(model == 'contrat'):
        fields = contrat_metadata(query)
    elif(model == 'centre_cout'):
        fields = centre_cout_metadata(query)
    elif(model == 'affectation'):
        fields = affectation_metadata(query)
    # add maxPages
    if(max_pages is not None):
        result['max_pages'] = max_pages
    # add count
    if(count is not None):
        result['count'] = count
    if(fields is not None):
        result['fields'] = fields
    return result


integer = 'integer'
string = 'string'
date = 'date'
boolean = 'boolean'


def fonction_metadata(query):
    designation_values = list(query.values('designation').distinct())
    return [
        {'type': integer, 'label': 'ID'},
        {'type': string, 'label': 'Designation', 'values': designation_values},
        {'type': string, 'label': 'Description'}
    ]


def ville_metadata(query):
    return [
        {'type': integer, 'label': 'ID'},
        {'type': string, 'label': 'Nom'},
    ]


def entite_metadata(query):
    entite_values = list(query.values('designation').distinct())
    return [
        {'type': integer, 'label': 'ID'},
        {'type': string, 'label': 'Designation', 'values': entite_values},
        {'type': string, 'label': 'Description'}
    ]


def direction_metadata(query):
    direction_values = list(query.values('designation').distinct())
    return [
        {'type': integer, 'label': 'ID'},
        {'type': string, 'label': 'Designation', 'values': direction_values},
        {'type': string, 'label': 'Description'}
    ]


def contrat_metadata(query):
    contrat_values = list(query.values('designation').distinct())
    return [
        {'type': integer, 'label': 'ID'},
        {'type': string, 'label': 'Designation', 'values': contrat_values},
        {'type': string, 'label': 'Description'}
    ]


def centre_cout_metadata(query):
    centre_cout_values = list(query.values('designation').distinct())
    return [
        {'type': integer, 'label': 'ID'},
        {'type': string, 'label': 'Designation', 'values': centre_cout_values},
        {'type': string, 'label': 'Description'}
    ]


def affectation_metadata(query):
    affectation_values = list(query.values('designation').distinct())
    return [
        {'type': integer, 'label': 'ID'},
        {'type': string, 'label': 'Designation', 'values': affectation_values},
        {'type': string, 'label': 'Description'}
    ]
