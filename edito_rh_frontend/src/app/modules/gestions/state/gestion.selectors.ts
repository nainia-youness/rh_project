import { createFeatureSelector, createSelector } from "@ngrx/store"
import { gestionState } from "./gestion.state"



const getGestionState= createFeatureSelector<gestionState>('gestion')


export const getModelsFailureSelector =createSelector(getGestionState,state=>{
    return state.error
})

//fonctions
export const getFonctionsSuccessSelector =createSelector(getGestionState,state=>{
    return state.fonctions
})
//villes
export const getVillesSuccessSelector =createSelector(getGestionState,state=>{
    return state.villes
})
//centres_cout
export const getCentresCoutSuccessSelector =createSelector(getGestionState,state=>{
    return state.centres_cout
})
//contrats
export const getContratsSuccessSelector =createSelector(getGestionState,state=>{
    return state.contrats
})
//directions
export const getDirectionsSuccessSelector =createSelector(getGestionState,state=>{
    return state.directions
})
//entites
export const getEntitesSuccessSelector =createSelector(getGestionState,state=>{
    return state.entites
})
//employes
export const getEmployesSuccessSelector =createSelector(getGestionState,state=>{
    return state.employes
})
//affectations
export const getAffectationsSuccessSelector =createSelector(getGestionState,state=>{
    return state.affectations
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