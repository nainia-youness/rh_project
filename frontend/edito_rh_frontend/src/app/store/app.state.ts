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

export const appReducer={
    screenSize:screenSizeReducer,
    layout:layoutReducer
}