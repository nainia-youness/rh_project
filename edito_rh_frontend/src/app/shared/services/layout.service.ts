import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { showFooterChange, showSideNavChange, sideNavItemsChange } from '../components/layout/state/layout.actions';


@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  
  constructor(private store:Store<AppState>) { }
  
  
  initializeLayout=(layoutConfig:any)=>{
    this.store.dispatch(showSideNavChange({showSideNav:layoutConfig.showSideNav}))
    this.store.dispatch(sideNavItemsChange({sideNavItems:layoutConfig.sideNavItems}))
    this.store.dispatch(showFooterChange({showFooter:layoutConfig.showFooter}))
  }
}
