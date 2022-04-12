import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authState } from "./auth.state";



const getAuthState= createFeatureSelector<authState>('auth')

export const loginSuccessSelector =createSelector(getAuthState,state=>{
    return state.loginResponse
})


export const loginFailureSelector =createSelector(getAuthState,state=>{
    return state.error
})


export const getAccessTokenSuccessSelector =createSelector(getAuthState,state=>{
    return state.accessToken
})
