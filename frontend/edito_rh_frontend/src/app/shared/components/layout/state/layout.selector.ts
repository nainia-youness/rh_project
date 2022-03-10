import { createFeatureSelector, createSelector } from "@ngrx/store"
import { LayoutState } from "./layout.state"

const getLayoutState = createFeatureSelector<LayoutState>('layout')


export const getSideNavItems=createSelector(getLayoutState,state=>{
    return state.sideNavItems
})

export const getShowSideNav=createSelector(getLayoutState,state=>{
    return state.showSideNav
})