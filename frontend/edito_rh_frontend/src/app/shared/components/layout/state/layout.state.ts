import { LayoutState } from "./layout.interface";



export const initialState: LayoutState={
    sideNavItems:[''],
    showSideNav:false,
    showFooter:false,
    showHeaderMenu:false,
    history:{
        userName:'',
        changeDate:new Date(),
        changeOperation:''
    }
} 


