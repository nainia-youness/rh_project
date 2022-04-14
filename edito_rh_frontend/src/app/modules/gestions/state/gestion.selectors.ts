import { createFeatureSelector, createSelector } from "@ngrx/store"
import { gestionState } from "./gestion.state"



const getGestionState= createFeatureSelector<gestionState>('gestion')

export const getEntitiesSuccessSelector =createSelector(getGestionState,state=>{
    return state.entities
})

export const getEntitiesFailureSelector =createSelector(getGestionState,state=>{
    return state.error
})

export const getFonctionsSuccessSelector =createSelector(getGestionState,state=>{
    return state.fonctions
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

export const pageSelector =createSelector(getGestionState,state=>{
    return state.page
})