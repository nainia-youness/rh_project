import { screenSizeReducer } from "../state/app.reducer";
import { ScreenSizeState } from "../state/app.state";

export interface AppState {
    screenSize: ScreenSizeState;
}

export const appReducer={
    screenSize:screenSizeReducer,
}