import { createFeatureSelector, createSelector } from "@ngrx/store"
import { gestionState } from "./gestion.state"



const getGestionState= createFeatureSelector<gestionState>('gestion')

export const getEntitiesSuccessSelector =createSelector(getGestionState,state=>{
    return state.entities
})

export const getEntitiesFailureSelector =createSelector(getGestionState,state=>{
    return state.entitiesError
})

export const getFonctionsSuccessSelector =createSelector(getGestionState,state=>{
    return state.fonctions
})


export const getFonctionsFailureSelector =createSelector(getGestionState,state=>{
    return state.fonctionsError
})

export const gestionPageSelector =createSelector(getGestionState,state=>{
    return state.gestionPage
})

export const getMetadataSelector =createSelector(getGestionState,state=>{
    return state.metadata
})

export const filtersSelector =createSelector(getGestionState,state=>{
    return state.filters
})

export const CurrentPageSelector =createSelector(getGestionState,state=>{
    return state.currentPage
})