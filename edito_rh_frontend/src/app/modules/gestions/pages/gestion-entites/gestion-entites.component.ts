import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { EntiteModel } from 'src/app/shared/models/entite.model';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';
import { gestionPageChange, getEntitesStart } from '../../state/gestion.actions';
import { getEntitesSuccessSelector } from '../../state/gestion.selectors';
import { GestionPage } from '../../state/gestion.state';

@Component({
  selector: 'app-gestion-entites',
  templateUrl: './gestion-entites.component.html',
  styleUrls: ['./gestion-entites.component.scss']
})
export class GestionEntitesComponent implements OnInit {

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
  dataSource$?:Observable<EntiteModel[] | undefined>;
  ngOnInit(): void {
    this.store.dispatch(getEntitesStart())
    this.store.dispatch(gestionPageChange({gestionPage:GestionPage.ENTITES}))
    
    this.Layout.initializeLayout(this.layoutConfig)
    this.getEntites()
  }

  getEntites=()=>{
    this.dataSource$=this.store.pipe(
      select(getEntitesSuccessSelector),
      filter( val=> val !== undefined),
      map((entites)=> entites)
    )
  }

  filterApiCall():void{
    this.store.dispatch(getEntitesStart())
  }


  constructor(
    private Layout:LayoutService,
    private store:Store<AppState>,
    ) { }

}
