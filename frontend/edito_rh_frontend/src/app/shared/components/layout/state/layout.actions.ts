import { createAction,props} from "@ngrx/store";

export const sideNavItemsChange=createAction('sideNavItemsChange',props<{screenSize:string}>())
