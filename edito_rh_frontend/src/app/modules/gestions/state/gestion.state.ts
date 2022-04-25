import { AffectationModel } from "src/app/shared/models/affectation.model"
import { CentreCoutModel } from "src/app/shared/models/centre_cout.model"
import { ContratModel } from "src/app/shared/models/contrat.model"
import { DirectionModel } from "src/app/shared/models/direction.model"
import { EmployeModel } from "src/app/shared/models/employe.model"
import { EntiteModel } from "src/app/shared/models/entite.model"
import { FonctionModel } from "src/app/shared/models/fonction.model"
import { FormuleModel } from "src/app/shared/models/formule.model"
import { RubriqueModel } from "src/app/shared/models/rubrique.model"
import { VariableModel } from "src/app/shared/models/variable.model"
import { VilleModel } from "src/app/shared/models/ville.model"


export enum GestionPage {
    NO_PAGE="",
    FONCTIONS = "Fonctions",
    VILLES = "Villes",
    ENTITES = "Entités",
    DIRECTIONS = "Directions",
    CONTRATS = "Contrats",
    CENTRES_COUT = "Centres Cout",
    AFFECTATIONS = "Affectations",
    EMPLOYES = "Employés",
    RUBRIQUES = "Rubriques",
    FORMULES = "Formules",
    VARIABLES = "Variables",
}

export enum FieldType {
    STRING = "string",
    NUMBER= "number",
    BOOLEAN= "boolean",
    DATE="date"
}

export interface Field{
    label:string,
    type:FieldType,
    values?:any[]
}

export interface Metadata {
    fields:Field[]
}

export enum FilterMode {
    CONTIENT = "Contient",
    EGAL= "Egal",
    DIFFERENT= "Différent",
    SUPPERIEUR_STRICT="Supperieur strictement",
    INFERIEUR_STRICT="Inférieur strictement",
    SUPPERIEUR="Supperieur",
    INFERIEUR="Inférieur",
    COMPRIS_ENTRE="Compris entre"
  }

export interface Filter {
    field:string,
    filterMode:FilterMode,
    value?:number | string,
    gte?:number | string,
    lte?:number | string
}

export interface Page {
    currentPage?:number,
    maxRowsPerPage?:number,
    maxPages?:number,
    nbrRowsInCurrentPage?:number,
    count?:number,
}


export interface gestionState {
    filters:Filter[],
    page:Page,
    gestionPage:GestionPage,
    metadata?: Metadata,
    fonctions?:FonctionModel[],
    villes?:VilleModel[],
    contrats?:ContratModel[],
    centres_cout?:CentreCoutModel[],
    entites?:EntiteModel[],
    directions?:DirectionModel[],
    affectations?:AffectationModel[],
    employes?:EmployeModel[],
    rubriques?:RubriqueModel[],
    formules?:FormuleModel[],
    variables?:VariableModel[],
    error?:string,
}


export const initialState: gestionState={
    filters:[],
    page:{currentPage:1,maxRowsPerPage:50},
    metadata:undefined,
    gestionPage:GestionPage.NO_PAGE,
    fonctions:undefined,
    villes:undefined,
    contrats:undefined,
    centres_cout:undefined,
    entites:undefined,
    directions:undefined,
    affectations:undefined,
    employes:undefined,
    rubriques:undefined,
    formules:undefined,
    variables:undefined,
    error:undefined
}
