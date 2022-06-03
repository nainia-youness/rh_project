import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { gestionPageChange } from 'src/app/modules/gestions/state/gestion.actions';
import { GestionPage } from 'src/app/modules/gestions/state/gestion.state';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-traitements',
  templateUrl: './traitements.component.html',
  styleUrls: ['./traitements.component.scss']
})
export class TraitementsComponent implements OnInit {

  layoutConfig={
    sideNavItems:[],
    showSideNav:false,
    showFooter:false,
  }
  
  ngOnInit(): void {
    this.Layout.initializeLayout(this.layoutConfig)
    this.store.dispatch(gestionPageChange({gestionPage:GestionPage.TRAITEMENTS}))
  }


  constructor(
    private Layout:LayoutService,
    private store:Store<AppState>,
    ) { }
}
