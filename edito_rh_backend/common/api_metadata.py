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
