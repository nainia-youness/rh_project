import { createReducer, on } from "@ngrx/store"
import { getFormuleSuccess, getModelFailure, getVariableSuccess, getVilleSuccess, isModelProgressBarChange, modelPageChange, modelPageTypeChange } from "./model.actions"
import { initialState } from "./model.state"


const _modelReducer= createReducer(
    initialState,
    on(modelPageChange,(state:any,action:any)=>{
        return {
            ...state,
            modelPage:action.modelPage,
        }
    }),
    on(modelPageTypeChange,(state:any,action:any)=>{
        return {
            ...state,
            modelPageType:action.modelPageType,
        }
    }),
    on(getModelFailure,(state:any,action:any)=>{
        return {
            ...state,
            error:action.error,
        }
    }),
    on(getVilleSuccess,(state:any,action:any)=>{
        return {
            ...state,
            ville:action.ville,
            isModelProgressBar:false,
        }
    }),
    on(getVariableSuccess,(state:any,action:any)=>{
        return {
            ...state,
            variable:action.variable,
            isModelProgressBar:false,
        }
    }),
    on(getFormuleSuccess,(state:any,action:any)=>{
        return {
            ...state,
            formule:action.formule,
            isModelProgressBar:false,
        }
    }),
    on(isModelProgressBarChange,(state:any,action:any)=>{
        return {
            ...state,
            isModelProgressBar:!state.isModelProgressBar
        }
    }),
)


export function modelReducer(state:any,action:any){
    return _modelReducer(state,action)
}