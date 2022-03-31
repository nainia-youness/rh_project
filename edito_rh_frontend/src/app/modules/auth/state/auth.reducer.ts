import { createReducer,on } from "@ngrx/store"

import {loginFailure, loginSuccess } from "./auth.actions"
import { initialState } from "./auth.state"



const _authReducer= createReducer(
    initialState,
    on(loginSuccess,(state:any,action:any)=>{
        return {
            ...state,
            authResponse: action.authResponse
        }
    }),
    on(loginFailure,(state:any,action:any)=>{
        return {
            ...state,
            error:action.error
        }
    }),
)


export function authReducer(state:any,action:any){
    return _authReducer(state,action)
}