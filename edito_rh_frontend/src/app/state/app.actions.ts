import { createAction,props} from "@ngrx/store";

export const screenSizeChange=createAction('screenSizeChange',props<{screenSize:string}>())
