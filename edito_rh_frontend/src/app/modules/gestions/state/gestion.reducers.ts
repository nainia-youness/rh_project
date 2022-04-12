import { createReducer, on } from "@ngrx/store"
import {  filtersChange, gestionPageChange, getEntitiesFailure, getFonctionsSuccess, getMetadata, pageChange } from "./gestion.actions"
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
            entities:action.fonctions,
        }
    }),
    on(getEntitiesFailure,(state:any,action:any)=>{
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