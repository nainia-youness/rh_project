import { createAction, props } from "@ngrx/store"
import { CentreCoutModel } from "src/app/shared/models/centre_cout.model"
import { ContratModel } from "src/app/shared/models/contrat.model"
import { DirectionModel } from "src/app/shared/models/direction.model"
import { EntiteModel } from "src/app/shared/models/entite.model"
import { FonctionModel } from "src/app/shared/models/fonction.model"
import { VilleModel } from "src/app/shared/models/ville.model"
import { Filter,Metadata, Page } from "./gestion.state"


enum ActionTypes {
    GESTION_PAGE_CHANGE = '[Gestion Pages] Gestion Page Change',
    GET_MODELS_FAILURE = '[Gestion Page] Get Models Failure',

    GET_FONCTIONS_START = '[Gestion Fonctions Page] Get Fonctions Start',
    GET_FONCTIONS_SUCCESS = '[Gestion Fonctions Page] Get Fonctions Success',

    GET_CENTRES_COUT_START = '[Gestion Centres Cout Page] Get Centres Cout Start',
    GET_CENTRES_COUT_SUCCESS = '[Gestion Centres Cout Page] Get Centres Cout Success',

    GET_CONTRATS_START = '[Gestion Contrats Page] Get Contrats Start',
    GET_CONTRATS_SUCCESS = '[Gestion Contrats Page] Get Contrats Success',

    GET_DIRECTIONS_START = '[Gestion Directions Page] Get Directions Start',
    GET_DIRECTIONS_SUCCESS = '[Gestion Directions Page] Get Directions Success',

    GET_ENTITES_START = '[Gestion Entites Page] Get Entites Start',
    GET_ENTITES_SUCCESS = '[Gestion Entites Page] Get Entites Success',

    GET_VILLES_START = '[Gestion Villes Page] Get Villes Start',
    GET_VILLES_SUCCESS = '[Gestion Villes Page] Get Villes Success',

    FILTERS_CHANGE = '[Gestion Page] Filters change',
    PAGE_CHANGE = '[Gestion Page] Page change',
    GET_METADATA = '[Gestion Pages] Get Metadata',
}

export const gestionPageChange=createAction(ActionTypes.GESTION_PAGE_CHANGE,props<{gestionPage:string}>())

//start
export const getFonctionsStart=createAction(ActionTypes.GET_FONCTIONS_START)
export const getCentresCoutStart=createAction(ActionTypes.GET_CENTRES_COUT_START)
export const getContratsStart=createAction(ActionTypes.GET_CONTRATS_START)
export const getDirectionsStart=createAction(ActionTypes.GET_DIRECTIONS_START)
export const getEntitesStart=createAction(ActionTypes.GET_ENTITES_START)
export const getVillesStart=createAction(ActionTypes.GET_VILLES_START)

//success
export const getFonctionsSuccess=createAction(ActionTypes.GET_FONCTIONS_SUCCESS,props<{fonctions:FonctionModel[] | undefined}>())
export const getCentresCoutSuccess=createAction(ActionTypes.GET_CENTRES_COUT_SUCCESS,props<{centres_cout:CentreCoutModel[] | undefined}>())
export const getContratsSuccess=createAction(ActionTypes.GET_CONTRATS_SUCCESS,props<{contrats:ContratModel[] | undefined}>())
export const getDirectionsSuccess=createAction(ActionTypes.GET_DIRECTIONS_SUCCESS,props<{directions:DirectionModel[] | undefined}>())
export const getEntitesSuccess=createAction(ActionTypes.GET_ENTITES_SUCCESS,props<{entites:EntiteModel[] | undefined}>())
export const getVillesSuccess=createAction(ActionTypes.GET_VILLES_SUCCESS,props<{villes:VilleModel[] | undefined}>())


export const getModelsFailure=createAction(ActionTypes.GET_MODELS_FAILURE,props<{error:string}>())


//metadata
export const getMetadata=createAction(ActionTypes.GET_METADATA,props<{metadata:Metadata}>())

export const filtersChange=createAction(ActionTypes.FILTERS_CHANGE,props<{filters:Filter[]}>())

export const pageChange=createAction(ActionTypes.PAGE_CHANGE,props<{page:Page}>())
