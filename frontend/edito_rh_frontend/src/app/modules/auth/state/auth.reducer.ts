import { createReducer,on } from "@ngrx/store"
import {loginChange } from "./auth.actions"
import { initialState } from "./auth.state"


const _authReducer= createReducer(
    initialState,
    on(loginChange,(state:any,action)=>{
        return {
            ...state,
            login:action.login
        }
    }),
)


export function authReducer(state:any,action:any){
    return _authReducer(state,action)
}