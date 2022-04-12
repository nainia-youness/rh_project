import { FonctionModel } from "src/app/shared/models/fonction.model"


export enum GestionPage {
    NO_PAGE="",
    FONCTIONS = "Fonctions",
}

export enum FieldType {
    STRING = "string",
    INTEGER= "integer",
    BOOLEAN= "boolean",
    DATETIME="date_time"
}

export interface Field{
    name:string,
    field_type:FieldType,
    values?:any[]
}

export interface Metadata {
    fields:Field[]
}
export interface Filter {
    field:string,
    value?:number,
    gte?:number,
    lte?:number
  }

export interface Page {
    currentPage?:number,
    rowsPerPage?:number,
    maxPages?:number,
}


export interface Logs {
    userName?:string,
    date_derniere_operation?:Date,
    derniere_operation?:string
}


export interface gestionState {
    filters:Filter[],
    page:Page,
    gestionPage:GestionPage,
    entities?:FonctionModel[],
    metadata?: Metadata,
    fonctions?:FonctionModel[]
    error?:string,
    entitiesLogs:Logs,
    entitiesLogsError:string,
}


export const initialState: gestionState={
    filters:[],
    page:{currentPage:1,rowsPerPage:100},
    metadata:undefined,
    gestionPage:GestionPage.NO_PAGE,
    entities:undefined,
    fonctions:undefined,
    error:undefined,
    entitiesLogs:{},
    entitiesLogsError:"",
}
