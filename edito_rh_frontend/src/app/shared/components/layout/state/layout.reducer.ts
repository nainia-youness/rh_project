import { createReducer,on } from "@ngrx/store"
import {getLogs, showFooterChange, showSideNavChange, sideNavItemsChange } from "./layout.actions"

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
    on(getLogs,(state:any,action:any)=>{
        return {
            ...state,
            logs:action.logs,
        }
    }),
)


export function layoutReducer(state:any,action:any){
    return _layoutReducer(state,action)
}