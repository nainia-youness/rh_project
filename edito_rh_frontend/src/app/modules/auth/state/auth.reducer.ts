import { createReducer,on } from "@ngrx/store"

import { getUserFailure, getUserSuccess, loginFailure, loginSuccess } from "./auth.actions"
import { initialState } from "./auth.state"



const _authReducer= createReducer(
    initialState,
    on(loginFailure,(state:any,action:any)=>{
        return {
            ...state,
            error:action.error
        }
    }),
    on(loginSuccess,(state:any,action:any)=>{
        return {
            ...state,
            loginResponse:action.loginResponse
        }
    }),
    on(getUserSuccess,(state:any,action:any)=>{
        return {
            ...state,
            user: action.user
        }
    }),
    on(getUserFailure,(state:any,action:any)=>{
        return {
            ...state,
            error:action.error
        }
    })
)


export function authReducer(state:any,action:any){
    return _authReducer(state,action)
}