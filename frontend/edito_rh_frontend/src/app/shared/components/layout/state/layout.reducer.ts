import { createReducer,on } from "@ngrx/store"
import { sideNavItemsChange } from "./layout.actions"

import { initialState } from "./layout.state"



const _layoutReducer= createReducer(
    initialState,
    on(sideNavItemsChange,(state:any,action)=>{
        return {
            ...state,
            sideNavItems:action.screenSize
        }
    }),
)


export function layoutReducer(state:any,action:any){
    return _layoutReducer(state,action)
}