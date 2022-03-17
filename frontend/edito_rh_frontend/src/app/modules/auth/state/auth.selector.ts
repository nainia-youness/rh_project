import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authState } from "./auth.state";



const getAuthState= createFeatureSelector<authState>('auth')

export const getScreenSize =createSelector(getAuthState,state=>{
    return state.login
})
