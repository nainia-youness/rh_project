import { createFeatureSelector, createSelector } from "@ngrx/store"
import { modelState } from "./model.state"


const getModelState= createFeatureSelector<modelState>('model')


export const getModelFailureSelector =createSelector(getModelState,state=>{
    return state.error
})

export const getVilleSuccessSelector =createSelector(getModelState,state=>{
    return state.ville
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
