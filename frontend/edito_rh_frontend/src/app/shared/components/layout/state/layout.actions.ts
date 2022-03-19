import { createAction,props} from "@ngrx/store";
import { History } from "./layout.interface";

enum ActionTypes {
    SIDENAV_ITEMS_CHANGE = '[SideNav] Sidenav Items Change',
    SHOW_SIDENAV_CHANGE = '[Sidenav] Show Sidenav Change',
    SHOW_FOOTER_CHANGE= '[Footer] Show footer Change',
    HISTORY_CHANGE= '[Footer] History Change'
}

export const sideNavItemsChange=createAction(ActionTypes.SIDENAV_ITEMS_CHANGE,props<{sideNavItems:string[]}>())

export const showSideNavChange=createAction(ActionTypes.SHOW_SIDENAV_CHANGE,props<{showSideNav:boolean}>())

export const showFooterChange=createAction(ActionTypes.SHOW_FOOTER_CHANGE,props<{showFooter:boolean}>())

export const historyChange=createAction(ActionTypes.HISTORY_CHANGE,props<{history:History}>())
