import { createReducer, on } from "@ngrx/store"
import { modelPageChange, modelPageTypeChange } from "./model.actions"
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
    })
)


export function modelReducer(state:any,action:any){
    return _modelReducer(state,action)
}