import { createReducer, on } from "@ngrx/store"
import {  filtersChange, gestionPageChange, getAffectationsSuccess, getCentresCoutSuccess, getContratsSuccess, getDirectionsSuccess, getEmployesSuccess, getEntitesSuccess, getFonctionsSuccess,getFormulesSuccess,getMetadata, getModelsFailure, getRubriquesSuccess, getVariablesSuccess, getVillesSuccess, isSpinnerChange, pageChange } from "./gestion.actions"
import { initialState } from "./gestion.state"


const _gestionReducer= createReducer(
    initialState,
    on(gestionPageChange,(state:any,action:any)=>{
        return {
            ...state,
            gestionPage:action.gestionPage,
        }
    }),
    on(getFonctionsSuccess,(state:any,action:any)=>{
        return {
            ...state,
            fonctions:action.fonctions,
            isSpinner:false,
        }
    }),
    on(getVillesSuccess,(state:any,action:any)=>{
        return {
            ...state,
            villes:action.villes,
            isSpinner:false,
        }
    }),
    on(getCentresCoutSuccess,(state:any,action:any)=>{
        return {
            ...state,
            centres_cout:action.centres_cout,
            isSpinner:false,
        }
    }),
    on(getContratsSuccess,(state:any,action:any)=>{
        return {
            ...state,
            contrats:action.contrats,
            isSpinner:false,
        }
    }),
    on(getDirectionsSuccess,(state:any,action:any)=>{
        return {
            ...state,
            directions:action.directions,
            isSpinner:false,
        }
    }),
    on(getEntitesSuccess,(state:any,action:any)=>{
        return {
            ...state,
            entites:action.entites,
            isSpinner:false,
        }
    }),
    on(getAffectationsSuccess,(state:any,action:any)=>{
        return {
            ...state,
            affectations:action.affectations,
            isSpinner:false,
        }
    }),
    on(getEmployesSuccess,(state:any,action:any)=>{
        return {
            ...state,
            employes:action.employes,
            isSpinner:false,
        }
    }),
    on(getRubriquesSuccess,(state:any,action:any)=>{
        return {
            ...state,
            rubriques:action.rubriques,
            isSpinner:false,
        }
    }),
    on(getFormulesSuccess,(state:any,action:any)=>{
        return {
            ...state,
            formules:action.formules,
            isSpinner:false,
        }
    }),
    on(getVariablesSuccess,(state:any,action:any)=>{
        return {
            ...state,
            variables:action.variables,
            isSpinner:false,
        }
    }),
    on(getModelsFailure,(state:any,action:any)=>{
        return {
            ...state,
            error:action.error,
        }
    }),
    on(getMetadata,(state:any,action:any)=>{
        return {
            ...state,
            metadata:action.metadata
        }
    }),
    on(filtersChange,(state:any,action:any)=>{
        return {
            ...state,
            filters:action.filters
        }
    }),
    on(pageChange,(state:any,action:any)=>{
        return {
            ...state,
            page:action.page
        }
    }),
    on(isSpinnerChange,(state:any,action:any)=>{
        return {
            ...state,
            isSpinner:!action.isSpinner
        }
    }),
)


export function gestionReducer(state:any,action:any){
    return _gestionReducer(state,action)
}