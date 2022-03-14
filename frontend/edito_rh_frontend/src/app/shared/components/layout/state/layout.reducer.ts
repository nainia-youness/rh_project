import { createReducer,on } from "@ngrx/store"
import { historyChange, showFooterChange, showHeaderMenuChange, showSideNavChange, sideNavItemsChange } from "./layout.actions"

import { initialState } from "./layout.state"



const _layoutReducer= createReducer(
    initialState,
    on(sideNavItemsChange,(state:any,action)=>{
        return {
            ...state,
            sideNavItems:action.sideNavItems
        }
    }),
    on(showSideNavChange,(state:any,action)=>{
        return {
            ...state,
            showSideNav:action.showSideNav
        }
    }),
    on(showFooterChange,(state:any,action)=>{
        return {
            ...state,
            showFooter:action.showFooter
        }
    }),
    on(historyChange,(state:any,action)=>{
        return {
            ...state,
            history:action.history
        }
    }),
    on(showHeaderMenuChange,(state:any,action)=>{
        return {
            ...state,
            showHeaderMenu:action.showHeaderMenu
        }
    }),
)


export function layoutReducer(state:any,action:any){
    return _layoutReducer(state,action)
}