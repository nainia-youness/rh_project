import { AuthEffects } from "../modules/auth/state/auth.effects";
import { authReducer } from "../modules/auth/state/auth.reducer";
import { authState } from "../modules/auth/state/auth.state";
import { GestionsEffects } from "../modules/gestions/state/gestion.effects";
import { gestionReducer } from "../modules/gestions/state/gestion.reducers";
import { gestionState } from "../modules/gestions/state/gestion.state";
import { LayoutEffects } from "../shared/components/layout/state/layout.effects";
import { LayoutState } from "../shared/components/layout/state/layout.interface";
import { layoutReducer } from "../shared/components/layout/state/layout.reducer";

import { screenSizeReducer } from "../state/app.reducer";
import { ScreenSizeState } from "../state/app.state";

export interface AppState {
    screenSize: ScreenSizeState,
    layout:LayoutState,
    auth:authState,
    gestion:gestionState
}

export const appReducers={
    screenSize:screenSizeReducer,
    layout:layoutReducer,
    auth:authReducer,
    gestion:gestionReducer,
}

export const appEffects=[
    AuthEffects,
    GestionsEffects,
    LayoutEffects
]