import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LayoutState } from 'src/app/shared/components/layout/state/layout.interface';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-gestion-fonctions',
  templateUrl: './gestion-fonctions.component.html',
  styleUrls: ['./gestion-fonctions.component.scss']
})
export class GestionFonctionsComponent implements OnInit {

  constructor(private store:Store<AppState>,private Layout:LayoutService) { }

  ngOnInit(): void {
    const layoutConfig:LayoutState={
      sideNavItems:['','Gestion des employés','Gestion des fonctions','Gestion des directions','Gestion des entité'],
      showSideNav:true,
      showFooter:true,
      showHeaderMenu:true,
      history:{
        userName:"userName",
        changeDate:new Date("11/24/2021"),
        changeOperation:'update'
      }
    }
    this.Layout.initializeLayout(layoutConfig)
  }

}
