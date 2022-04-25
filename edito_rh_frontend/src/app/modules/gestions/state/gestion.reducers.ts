import { createReducer, on } from "@ngrx/store"
import {  filtersChange, gestionPageChange, getAffectationsSuccess, getCentresCoutSuccess, getContratsSuccess, getDirectionsSuccess, getEmployesSuccess, getEntitesSuccess, getFonctionsSuccess,getFormulesSuccess,getMetadata, getModelsFailure, getRubriquesSuccess, getVariablesSuccess, getVillesSuccess, pageChange } from "./gestion.actions"
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
        }
    }),
    on(getVillesSuccess,(state:any,action:any)=>{
        return {
            ...state,
            villes:action.villes,
        }
    }),
    on(getCentresCoutSuccess,(state:any,action:any)=>{
        return {
            ...state,
            centres_cout:action.centres_cout,
        }
    }),
    on(getContratsSuccess,(state:any,action:any)=>{
        return {
            ...state,
            contrats:action.contrats,
        }
    }),
    on(getDirectionsSuccess,(state:any,action:any)=>{
        return {
            ...state,
            directions:action.directions,
        }
    }),
    on(getEntitesSuccess,(state:any,action:any)=>{
        return {
            ...state,
            entites:action.entites,
        }
    }),
    on(getAffectationsSuccess,(state:any,action:any)=>{
        return {
            ...state,
            affectations:action.affectations,
        }
    }),
    on(getEmployesSuccess,(state:any,action:any)=>{
        return {
            ...state,
            employes:action.employes,
        }
    }),
    on(getRubriquesSuccess,(state:any,action:any)=>{
        return {
            ...state,
            rubriques:action.rubriques,
        }
    }),
    on(getFormulesSuccess,(state:any,action:any)=>{
        return {
            ...state,
            formules:action.formules,
        }
    }),
    on(getVariablesSuccess,(state:any,action:any)=>{
        return {
            ...state,
            variables:action.variables,
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
)


export function gestionReducer(state:any,action:any){
    return _gestionReducer(state,action)
}