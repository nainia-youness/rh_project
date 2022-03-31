import { createReducer,on } from "@ngrx/store"
import { screenSizeChange } from "./app.actions"
import { initialState } from "./app.state"


const _screenSizeReducer= createReducer(
    initialState,
    on(screenSizeChange,(state:any,action)=>{
        return {
            ...state,
            screenSize:action.screenSize
        }
    }),
)


export function screenSizeReducer(state:any,action:any){
    return _screenSizeReducer(state,action)
}