import { createAction,props} from "@ngrx/store";

export const sideNavItemsChange=createAction('sideNavItemsChange',props<{sideNavItems:string[]}>())

export const showSideNavChange=createAction('showSideNavChange',props<{showSideNav:boolean}>())