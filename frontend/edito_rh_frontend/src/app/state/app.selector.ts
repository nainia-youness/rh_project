import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ScreenSizeState } from "./app.state";

const getScreenSizeState = createFeatureSelector<ScreenSizeState>('screenSize')

export const getScreenSize =createSelector(getScreenSizeState,state=>{
    return state.screenSize
})
