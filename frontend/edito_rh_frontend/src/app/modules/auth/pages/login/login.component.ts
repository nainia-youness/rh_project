import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { historyChange, showFooterChange, showSideNavChange, sideNavItemsChange } from 'src/app/shared/components/layout/state/layout.actions';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(showSideNavChange({showSideNav:true}))
    this.store.dispatch(sideNavItemsChange({sideNavItems:['','Gestion des employés','Gestion des fonctions','Gestion des directions','Gestion des entité']}))
    this.store.dispatch(showFooterChange({showFooter:true}))
    this.store.dispatch(historyChange({history:{
      userName:"edddd",
      changeDate:new Date("11/24/2021"),
      changeOperation:'ssss'
    }}))
  }
}
