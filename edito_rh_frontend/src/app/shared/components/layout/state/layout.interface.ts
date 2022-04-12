export interface Logs {
        userName?:string,
        changeDate?:Date,
        changeOperation?:string
}

export interface SideNavItem{
    title:string,
    path:string
}

export interface LayoutState {
    sideNavItems:SideNavItem[],
    showSideNav:boolean,
    showFooter:boolean,
    entitiesLogs:Logs,
    entitiesLogsError:string,
    fonctionsLogs:Logs,
    fonctionsLogsError:string
}