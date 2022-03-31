import { createAction,props} from "@ngrx/store";
import { Logs } from "./layout.interface";



enum ActionTypes {
    SIDENAV_ITEMS_CHANGE = '[SideNav] Sidenav Items Change',
    SHOW_SIDENAV_CHANGE = '[Sidenav] Show Sidenav Change',
    SHOW_FOOTER_CHANGE= '[Footer] Show footer Change',
    GET_FONCTIONS_LOGS_START= '[Fonction Footer] Get Fonctions Logs Start',
    GET_FONCTIONS_LOGS_SUCCESS= '[Fonction Footer] Get Fonctions Logs Success',
    GET_FONCTIONS_LOGS_FAILURE= '[Fonction Footer] Get Fonctions Logs Failure'
}

export const sideNavItemsChange=createAction(ActionTypes.SIDENAV_ITEMS_CHANGE,props<{sideNavItems:string[]}>())

export const showSideNavChange=createAction(ActionTypes.SHOW_SIDENAV_CHANGE,props<{showSideNav:boolean}>())

export const showFooterChange=createAction(ActionTypes.SHOW_FOOTER_CHANGE,props<{showFooter:boolean}>())

export const getFonctionsLogsStart=createAction(ActionTypes.GET_FONCTIONS_LOGS_START)

export const getFonctionsLogsSuccess=createAction(ActionTypes.GET_FONCTIONS_LOGS_SUCCESS,props<{fonctionsLogs:Logs}>())

export const GetFonctionsLogsFailure=createAction(ActionTypes.GET_FONCTIONS_LOGS_FAILURE,props<{fonctionsLogsError:string}>())