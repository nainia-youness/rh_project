
export interface SideNavItem{
    title:string,
    path:string
}

export interface LayoutState {
    sideNavItems:SideNavItem[],
    showSideNav:boolean,
    showFooter:boolean,
}