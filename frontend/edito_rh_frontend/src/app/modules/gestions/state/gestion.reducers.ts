import { createReducer, on } from "@ngrx/store"
import { currentPageChange, filtersChange, gestionPageChange, getFonctionsFailure, getFonctionsSuccess, getMetadata } from "./gestion.actions"
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
    on(getFonctionsFailure,(state:any,action:any)=>{
        return {
            ...state,
            error:action.error,
            entitiesError:action.error
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
    on(currentPageChange,(state:any,action:any)=>{
        return {
            ...state,
            currentPage:action.currentPage
        }
    }),
)


export function gestionReducer(state:any,action:any){
    return _gestionReducer(state,action)
}