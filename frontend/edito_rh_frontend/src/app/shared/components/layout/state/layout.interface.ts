export interface History {
        userName:string,
        changeDate:Date,
        changeOperation:string
}


export interface LayoutState {
    sideNavItems:string [],
    showSideNav:boolean,
    showFooter:boolean,
    showHeaderMenu:boolean,
    history:History,
}