import { AuthEffects } from "../modules/auth/state/auth.effects";
import { authReducer } from "../modules/auth/state/auth.reducer";
import { authState } from "../modules/auth/state/auth.state";
import { LayoutState } from "../shared/components/layout/state/layout.interface";
import { layoutReducer } from "../shared/components/layout/state/layout.reducer";

import { screenSizeReducer } from "../state/app.reducer";
import { ScreenSizeState } from "../state/app.state";

export interface AppState {
    screenSize: ScreenSizeState;
    layout:LayoutState
    auth:authState
}

export const appReducers={
    screenSize:screenSizeReducer,
    layout:layoutReducer,
    auth:authReducer
}

export const appEffects=[
    AuthEffects
]