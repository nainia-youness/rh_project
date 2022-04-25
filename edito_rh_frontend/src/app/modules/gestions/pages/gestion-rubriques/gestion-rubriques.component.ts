import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { RubriqueModel } from 'src/app/shared/models/rubrique.model';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';
import { gestionPageChange, getRubriquesStart } from '../../state/gestion.actions';
import { getRubriquesSuccessSelector } from '../../state/gestion.selectors';
import { GestionPage } from '../../state/gestion.state';

@Component({
  selector: 'app-gestion-rubriques',
  templateUrl: './gestion-rubriques.component.html',
  styleUrls: ['./gestion-rubriques.component.scss']
})
export class GestionRubriquesComponent implements OnInit {

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
  dataSource$?:Observable<RubriqueModel[] | undefined>;
  ngOnInit(): void {
    this.store.dispatch(getRubriquesStart())
    this.store.dispatch(gestionPageChange({gestionPage:GestionPage.RUBRIQUES}))
    
    this.Layout.initializeLayout(this.layoutConfig)
    this.getRubriques()
  }

  getRubriques=()=>{
    this.dataSource$=this.store.pipe(
      select(getRubriquesSuccessSelector),
      filter( val=> val !== undefined),
      map((rubriques)=> rubriques)
    )
  }

  filterApiCall():void{
    this.store.dispatch(getRubriquesStart())
  }


  constructor(
    private Layout:LayoutService,
    private store:Store<AppState>,
    ) { }

}
