import { createFeatureSelector, createSelector } from "@ngrx/store"
import { modelState } from "./model.state"


const getModelState= createFeatureSelector<modelState>('model')


export const getModelFailureSelector =createSelector(getModelState,state=>{
    return state.error
})

export const putModelFailureSelector =createSelector(getModelState,state=>{
    return state.putError
})

export const postModelFailureSelector =createSelector(getModelState,state=>{
    return state.postError
})

export const getVilleSuccessSelector =createSelector(getModelState,state=>{
    return state.ville
})

export const getVariableSuccessSelector =createSelector(getModelState,state=>{
    return state.variable
})

export const getFormuleSuccessSelector =createSelector(getModelState,state=>{
    return state.formule
})



export const getAffectationSuccessSelector =createSelector(getModelState,state=>{
    return state.affectation
})

export const getCentreCoutSuccessSelector =createSelector(getModelState,state=>{
    return state.centreCout
})

export const getContratSuccessSelector =createSelector(getModelState,state=>{
    return state.contrat
})

export const getDirectionSuccessSelector =createSelector(getModelState,state=>{
    return state.direction
})

export const getEntiteSuccessSelector =createSelector(getModelState,state=>{
    return state.entite
})

export const getFonctionSuccessSelector =createSelector(getModelState,state=>{
    return state.fonction
})

export const getRubriqueSuccessSelector =createSelector(getModelState,state=>{
    return state.rubrique
})

export const getEmployeSuccessSelector =createSelector(getModelState,state=>{
    return state.employe
})





export const isModelProgressBarSelector =createSelector(getModelState,state=>{
    return state.isModelProgressBar
})

export const modelPageTypeSelector =createSelector(getModelState,state=>{
    return state.modelPageType
})

export const modelPageSelector =createSelector(getModelState,state=>{
    return state.modelPage
})
