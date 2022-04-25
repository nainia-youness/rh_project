import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LayoutState } from 'src/app/shared/components/layout/state/layout.interface';
import { FonctionModel } from 'src/app/shared/models/fonction.model';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';
import { gestionPageChange, getFonctionsStart} from '../../state/gestion.actions';
import { getFonctionsSuccessSelector} from '../../state/gestion.selectors';
import { GestionPage } from '../../state/gestion.state';
import { filter,map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-gestion-fonctions',
  templateUrl: './gestion-fonctions.component.html',
  styleUrls: ['./gestion-fonctions.component.scss']
})
export class GestionFonctionsComponent implements OnInit {
  
  layoutConfig={
    sideNavItems:[
      {title:'Gestion des fonctions',path:'/gestion/fonctions'},
      {title:'Gestion des villes',path:'/gestion/villes'},
      {title:'Gestion des entités',path:'/gestion/entités'},
      {title:'Gestion des directions',path:'/gestion/directions'},
      {title:'Gestion des contrats',path:'/gestion/contrats'},
      {title:'Gestion des centres-cout',path:'/gestion/centres-cout'},
      {title:'Gestion des affectations',path:'/gestion/affectations'},
      {title:'Gestion des employés',path:'/gestion/employés'},
      {title:'Gestion des rubriques',path:'/gestion/rubriques'},
      {title:'Gestion des formules',path:'/gestion/formules'},
      {title:'Gestion des variables',path:'/gestion/variables'},
    ],
    showSideNav:true,
    showFooter:false,
  }
  dataSource$?:Observable<FonctionModel[] | undefined>;
  ngOnInit(): void {
    this.store.dispatch(getFonctionsStart())
    this.store.dispatch(gestionPageChange({gestionPage:GestionPage.FONCTIONS}))
    
    this.Layout.initializeLayout(this.layoutConfig)
    this.getFonctions()
  }

  getFonctions=()=>{
    this.dataSource$=this.store.pipe(
      select(getFonctionsSuccessSelector),
      filter( val=> val !== undefined),
      map((fonctions)=> fonctions)
    )
  }

  filterApiCall():void{
    this.store.dispatch(getFonctionsStart())
  }


  constructor(
    private Layout:LayoutService,
    private store:Store<AppState>,
    ) { }
}