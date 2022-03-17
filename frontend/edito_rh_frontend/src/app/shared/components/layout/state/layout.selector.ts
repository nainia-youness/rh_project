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


export const getHistory=createSelector(getLayoutState,state=>{
    return state.history
})


