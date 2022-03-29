import { createFeatureSelector, createSelector } from "@ngrx/store"
import { LayoutState } from "./layout.interface"


const getLayoutState = createFeatureSelector<LayoutState>('layout')


export const getSideNavItems=createSelector(getLayoutState,state=>{
    return state.sideNavItems
})

export const getShowSideNav=createSelector(getLayoutState,state=>{
    return state.showSideNav
})

export const getShowFooter=createSelector(getLayoutState,state=>{
    return state.showFooter
})

export const getFonctionsLogsSuccessSelector =createSelector(getLayoutState,state=>{
    return state.fonctionsLogs
})

export const getFonctionsLogsFailureSelector =createSelector(getLayoutState,state=>{
    return state.fonctionsLogsError
})

export const getEntitiesLogsSuccessSelector =createSelector(getLayoutState,state=>{
    return state.entitiesLogs
})

export const getEntitiesLogsFailureSelector =createSelector(getLayoutState,state=>{
    return state.entitiesLogsError
})
