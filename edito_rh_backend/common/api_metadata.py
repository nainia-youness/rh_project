from rest_framework.schemas.openapi import AutoSchema
from rest_framework.metadata import SimpleMetadata
import sys


sys.path.insert(2, '../apps')
from apps.employes.models import Employe
from apps.fonctions.models import Fonction
from apps.centres_cout.models import CentreCout
from apps.villes.models import Ville
from apps.contrats.models import Contrat
from apps.directions.models import Direction
from apps.affectations.models import Affectation
from apps.entites.models import Entite
from apps.variables.models import Variable

def get_metadata(model, query,is_one=False):
    result = {}
    fields = None
    if(model == 'fonction'):
        fields = fonction_metadata(query,is_one)
    elif(model == 'ville'):
        fields = ville_metadata(query,is_one)
    elif(model == 'entite'):
        fields = entite_metadata(query,is_one)
    elif(model == 'direction'):
        fields = direction_metadata(query,is_one)
    elif(model == 'contrat'):
        fields = contrat_metadata(query,is_one)
    elif(model == 'centre_cout'):
        fields = centre_cout_metadata(query,is_one)
    elif(model == 'affectation'):
        fields = affectation_metadata(query,is_one)
    elif(model == 'employe'):
        fields = employe_metadata(query)
    elif(model == 'rubrique'):
        fields = rubrique_metadata(query,is_one)
    elif(model == 'formule'):
        fields = formule_metadata(query,is_one)
    elif(model == 'variable'):
        fields = variable_metadata(query,is_one)
    if(fields is not None):
        result['fields'] = fields
    return result


number = 'number'
string = 'string'
date = 'date'
boolean = 'boolean'
text='text'
object='object'

def variable_metadata(query,is_one):
    result=[
        {'type': number, 'label': 'id'},
        {'type': number, 'label': 'valeur'}
    ]
    if(is_one):
        result.append({'type': string, 'label': 'designation'})
    else:
        variable_values =get_distinct_values(query,'designation') 
        result.append({'type': string, 'label': 'designation', 'values': variable_values},)
    
    return result

def rubrique_metadata(query,is_one):
    result=[
        {'type': number, 'label': 'id'},
        {'type': string, 'label': 'description'}
    ]
    if(is_one):
        result.append({'type': string, 'label': 'designation'})
    else:
        rubrique_values =get_distinct_values(query,'designation') 
        result.append({'type': string, 'label': 'designation', 'values': rubrique_values})
    
    return result

def formule_metadata(query,is_one):
    result=[
        {'type': number, 'label': 'id'},
        {'type': string, 'label': 'formule'},
    ]
    if(is_one):
        variables_metadata=variable_metadata(query,is_one)
        result.append({'type': string, 'label': 'designation'})
        result.append({'type': object, 'label': 'variables','children_metadata':variables_metadata})
    else:
        q_variable=Variable.objects.all()
        variable_values=get_distinct_values(q_variable,'designation')
        formule_values =get_distinct_values(query,'designation') 
        result.append({'type': string, 'label': 'designation', 'values': formule_values})
        result.append({'type': string, 'label': 'variables','values':variable_values})
    
    return result

def employe_metadata(query):
    q_fonction=Fonction.objects.all()
    fonction_values=get_distinct_values(q_fonction,'designation')
    q_centre_cout=CentreCout.objects.all()
    centre_cout_values=get_distinct_values(q_centre_cout,'designation')
    q_direction=Direction.objects.all()
    direction_values=get_distinct_values(q_direction,'designation')
    q_ville=Ville.objects.all()
    ville_values=get_distinct_values(q_ville,'nom')
    q_contrat=Contrat.objects.all()
    contrat_values=get_distinct_values(q_contrat,'designation')
    q_direction=Direction.objects.all()
    direction_values=get_distinct_values(q_direction,'designation')
    q_affectation=Affectation.objects.all()
    affectation_values=get_distinct_values(q_affectation,'designation')
    q_entite=Entite.objects.all()
    entite_values=get_distinct_values(q_entite,'designation')
    return [
        {'type': number, 'label': 'matricule'},
        {'type': string, 'label': 'nom'},
        {'type': string, 'label': 'prenom'},
        {'type': date, 'label': 'date_naissance'},
        {'type': string, 'label': 'sexe','values':['M','F']},
        {'type': string, 'label': 'cin'},
        {'type': date, 'label': 'date_entree'},
        {'type': string, 'label': 'situation_familiale','values':['Marié(e)','Célibataire']},
        {'type': number, 'label': 'nombre_enfant'},
        {'type': number, 'label': 'charge_familiale'},
        {'type': string, 'label': 'adresse'},
        {'type': string, 'label': 'nationalite'},
        {'type': string, 'label': 'cnss'},
        {'type': number, 'label': 'salaire'},
        {'type': number, 'label': 'numero_compte'},
        {'type': number, 'label': 'participation'},
        {'type': date, 'label': 'date_sortie'},
        {'type': string, 'label': 'fonction','values':fonction_values},
        {'type': string, 'label': 'centre_cout','values':centre_cout_values},
        {'type': string, 'label': 'direction','values':direction_values},
        {'type': string, 'label': 'ville','values':ville_values},
        {'type': string, 'label': 'contrat','values':contrat_values},
        {'type': string, 'label': 'affectation','values':affectation_values},
        {'type': string, 'label': 'entite','values':entite_values},
        {'type': string, 'label': 'delegue'},
    ]

def fonction_metadata(query,is_one):
    result=[
        {'type': number, 'label': 'id'},
        {'type': string, 'label': 'description'}
    ]
    if(is_one):
        result.append({'type': string, 'label': 'designation'})
    else:
        designation_values =get_distinct_values(query,'designation') 
        result.append({'type': string, 'label': 'designation', 'values': designation_values},)
    
    return result

def get_distinct_values(query,model):
    distinct_values_dict=list(query.values(model).distinct())
    distinct_values_list=[i[model] for i in distinct_values_dict]
    return distinct_values_list


def ville_metadata(query,is_one):
    result=[
        {'type': number, 'label': 'id'},
    ]
    if(is_one):
        result.append({'type': string, 'label': 'nom'})
    else:
        ville_values =get_distinct_values(query,'nom') 
        result.append({'type': string, 'label': 'nom', 'values': ville_values})
    
    return result


def entite_metadata(query,is_one):
    result=[
        {'type': number, 'label': 'id'},
        {'type': string, 'label': 'description'}
    ]
    if(is_one):
        result.append({'type': string, 'label': 'designation'})
    else:
        entite_values = get_distinct_values(query,'designation')  
        result.append({'type': string, 'label': 'designation', 'values': entite_values})
    
    return result


def direction_metadata(query,is_one):
    result=[
        {'type': number, 'label': 'id'},
        {'type': string, 'label': 'description'}
    ]
    if(is_one):
        result.append( {'type': string, 'label': 'designation'})
    else:
        direction_values = get_distinct_values(query,'designation')  
        #direction_values = list(query.values('designation').distinct()) 
        result.append({'type': string, 'label': 'designation', 'values': direction_values})
    
    return result


def contrat_metadata(query,is_one):
    result=[
        {'type': number, 'label': 'id'},
        {'type': string, 'label': 'description'}
    ]
    if(is_one):
        result.append( {'type': string, 'label': 'designation'})
    else:
        contrat_values = get_distinct_values(query,'designation') 
        result.append({'type': string, 'label': 'designation', 'values': contrat_values})
    
    return result


def centre_cout_metadata(query,is_one):
    result=[
        {'type': number, 'label': 'id'},
        {'type': string, 'label': 'description'}
    ]
    if(is_one):
        result.append({'type': string, 'label': 'designation'})
    else:
        centre_cout_values = get_distinct_values(query,'designation') 
        result.append({'type': string, 'label': 'designation', 'values': centre_cout_values})
    
    return result


def affectation_metadata(query,is_one):
    result=[
        {'type': number, 'label': 'id'},
        {'type': string, 'label': 'description'}
    ]
    if(is_one):
        result.append({'type': string, 'label': 'designation'})
    else:
        affectation_values = get_distinct_values(query,'designation') 
        result.append({'type': string, 'label': 'designation', 'values': affectation_values})
    
    return result
