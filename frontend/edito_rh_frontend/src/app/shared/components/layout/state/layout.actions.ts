import { createAction,props} from "@ngrx/store";
import { History } from "./layout.interface";

export const sideNavItemsChange=createAction('sideNavItemsChange',props<{sideNavItems:string[]}>())

export const showSideNavChange=createAction('showSideNavChange',props<{showSideNav:boolean}>())

export const showFooterChange=createAction('showFooterChange',props<{showFooter:boolean}>())

export const historyChange=createAction('historyChange',props<{history:History}>())
