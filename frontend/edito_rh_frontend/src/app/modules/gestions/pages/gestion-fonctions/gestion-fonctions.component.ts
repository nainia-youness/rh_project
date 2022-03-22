import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { LayoutState } from 'src/app/shared/components/layout/state/layout.interface';
import { FonctionModel } from 'src/app/shared/models/fonction.model';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';
import { gestionPageChange, getFonctionsStart} from '../../state/gestion.actions';
import { getFonctionsSuccessSelector } from '../../state/gestion.selectors';

@Component({
  selector: 'app-gestion-fonctions',
  templateUrl: './gestion-fonctions.component.html',
  styleUrls: ['./gestion-fonctions.component.scss']
})
export class GestionFonctionsComponent implements OnInit {
  
  layoutConfig:LayoutState={
    sideNavItems:['','Gestion des employés','Gestion des fonctions','Gestion des directions','Gestion des entité'],
    showSideNav:true,
    showFooter:true,
    history:{
      userName:"userName",
      changeDate:new Date("11/24/2021"),
      changeOperation:'update'
    }
  }
  
  ngOnInit(): void {
    this.store.dispatch(getFonctionsStart())
    this.store.dispatch(gestionPageChange({gestionPage:"Fonctions"}))
    
    this.Layout.initializeLayout(this.layoutConfig)

  }

  constructor(
    private Layout:LayoutService,
    private store:Store<AppState>) { }
}