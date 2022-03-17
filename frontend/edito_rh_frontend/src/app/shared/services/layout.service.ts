import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { historyChange,showFooterChange, showSideNavChange, sideNavItemsChange } from '../components/layout/state/layout.actions';
import { LayoutState } from '../components/layout/state/layout.interface';


@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  
  constructor(private store:Store<AppState>) { }
  
  
  initializeLayout=(layoutConfig:LayoutState)=>{
    this.store.dispatch(showSideNavChange({showSideNav:layoutConfig.showSideNav}))
    this.store.dispatch(sideNavItemsChange({sideNavItems:layoutConfig.sideNavItems}))
    this.store.dispatch(showFooterChange({showFooter:layoutConfig.showFooter}))
    this.store.dispatch(historyChange({history:layoutConfig.history}))
  }
}
