import { createFeatureSelector, createSelector } from "@ngrx/store"
import { modelState } from "./model.state"


const getModelState= createFeatureSelector<modelState>('model')

export const modelPageTypeSelector =createSelector(getModelState,state=>{
    return state.modelPageType
})

export const modelPageSelector =createSelector(getModelState,state=>{
    return state.modelPage
})
