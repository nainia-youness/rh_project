

export interface Logs {
    user_nom?:string,
    user_prenom?:string,
    date_derniere_operation?:Date,
    derniere_operation?:string
}

export interface SideNavItem{
    title:string,
    path:string
}

export interface LayoutState {
    sideNavItems:SideNavItem[],
    showSideNav:boolean,
    showFooter:boolean,
    logs?:Logs
}