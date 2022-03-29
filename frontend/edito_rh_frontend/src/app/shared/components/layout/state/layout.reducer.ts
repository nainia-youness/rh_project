import { createReducer,on } from "@ngrx/store"
import { GetFonctionsLogsFailure, getFonctionsLogsSuccess,showFooterChange, showSideNavChange, sideNavItemsChange } from "./layout.actions"

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
    on(getFonctionsLogsSuccess,(state:any,action:any)=>{
        return {
            ...state,
            fonctionsLogs:action.fonctionsLogs,
            entitiesLogs:action.fonctionsLogs,
        }
    }),
    on(GetFonctionsLogsFailure,(state:any,action:any)=>{
        return {
            ...state,
            fonctionsLogsError:action.fonctionsLogsError,
            entitiesLogsError:action.entitiesLogsError
        }
    }),
)


export function layoutReducer(state:any,action:any){
    return _layoutReducer(state,action)
}