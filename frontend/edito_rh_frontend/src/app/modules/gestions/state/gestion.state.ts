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



export interface gestionState {
    gestionPage:GestionPage,
    entities?:FonctionModel[],
    entitiesError?:string,
    metadata?: Metadata,
    fonctions?:FonctionModel[]
    fonctionsError?:string
}


export const initialState: gestionState={
    metadata:undefined,
    gestionPage:GestionPage.NO_PAGE,
    entities:undefined,
    entitiesError:undefined,
    fonctions:undefined,
    fonctionsError:undefined
}
