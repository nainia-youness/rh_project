import { createAction, props } from "@ngrx/store"
import { FonctionModel } from "src/app/shared/models/fonction.model"
import { Filter, Metadata, Page } from "./gestion.state"


enum ActionTypes {
    GESTION_PAGE_CHANGE = '[Gestion Pages] Gestion Page Change',
    GET_FONCTIONS_START = '[Gestion Fonction Page] Get Fonctions Start',
    GET_FONCTIONS_SUCCESS = '[Gestion Fonction Page] Get Fonctions Success',
    GET_FONCTIONS_FAILURE = '[Gestion Fonction Page] Get Fonctions Failure',
    FILTERS_CHANGE = '[Gestion Page] Filters change',
    CURRENT_PAGE_CHANGE = '[Gestion Page] Current Page change',
    GET_METADATA = '[Gestion Pages] Get Metadata',
}

export const gestionPageChange=createAction(ActionTypes.GESTION_PAGE_CHANGE,props<{gestionPage:string}>())

export const getFonctionsStart=createAction(ActionTypes.GET_FONCTIONS_START)


export const getFonctionsSuccess=createAction(ActionTypes.GET_FONCTIONS_SUCCESS,props<{fonctions:FonctionModel[] | undefined}>())

export const getFonctionsFailure=createAction(ActionTypes.GET_FONCTIONS_FAILURE,props<{error:string}>())



export const getMetadata=createAction(ActionTypes.GET_METADATA,props<{metadata:Metadata}>())

export const filtersChange=createAction(ActionTypes.FILTERS_CHANGE,props<{filters:Filter[]}>())

export const pageChange=createAction(ActionTypes.CURRENT_PAGE_CHANGE,props<{page:Page}>())
