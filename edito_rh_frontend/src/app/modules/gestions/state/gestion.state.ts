import { FonctionModel } from "src/app/shared/models/fonction.model"


export enum GestionPage {
    NO_PAGE="",
    FONCTIONS = "Fonctions",
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
    entities?:FonctionModel[],
    metadata?: Metadata,
    fonctions?:FonctionModel[]
    error?:string,
}


export const initialState: gestionState={
    filters:[],
    page:{currentPage:1,maxRowsPerPage:50},
    metadata:undefined,
    gestionPage:GestionPage.NO_PAGE,
    entities:undefined,
    fonctions:undefined,
    error:undefined
}
