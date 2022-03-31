export interface Logs {
        userName?:string,
        changeDate?:Date,
        changeOperation?:string
}


export interface LayoutState {
    sideNavItems:string [],
    showSideNav:boolean,
    showFooter:boolean,
    entitiesLogs:Logs,
    entitiesLogsError:string,
    fonctionsLogs:Logs,
    fonctionsLogsError:string
}