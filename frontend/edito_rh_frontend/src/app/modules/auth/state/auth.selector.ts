import { createFeatureSelector, createSelector } from "@ngrx/store";



const getAuthState= createFeatureSelector<sss>('login')

export const getScreenSize =createSelector(getAuthState,state=>{
    return state.login
})
