import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserStart } from 'src/app/modules/auth/state/auth.actions';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent implements OnInit {

  layoutConfig={
    sideNavItems:['Gestion des employés','Gestion des fonctions','Gestion des directions','Gestion des entité'],
    showSideNav:true,
    showFooter:false,
  }

  ngOnInit(): void {
    this.Layout.initializeLayout(this.layoutConfig)
  }

  constructor(
    private Layout:LayoutService,
    private store:Store<AppState>,
    ) { }
}
