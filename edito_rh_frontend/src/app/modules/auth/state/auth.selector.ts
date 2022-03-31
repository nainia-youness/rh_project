import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authState } from "./auth.state";



const getAuthState= createFeatureSelector<authState>('auth')


export const getLoginSuccess =createSelector(getAuthState,state=>{
    return state.authResponse
})


export const getLoginFailure =createSelector(getAuthState,state=>{
    return state.error
})