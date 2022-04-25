import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { AffectationModel } from 'src/app/shared/models/affectation.model';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';
import { gestionPageChange, getAffectationsStart, isSpinnerChange } from '../../state/gestion.actions';
import { getAffectationsSuccessSelector } from '../../state/gestion.selectors';
import { GestionPage } from '../../state/gestion.state';

@Component({
  selector: 'app-gestion-affectations',
  templateUrl: './gestion-affectations.component.html',
  styleUrls: ['./gestion-affectations.component.scss']
})
export class GestionAffectationsComponent implements OnInit {

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
  dataSource$?:Observable<AffectationModel[] | undefined>;
  ngOnInit(): void {
    this.store.dispatch(getAffectationsStart())
    this.store.dispatch(gestionPageChange({gestionPage:GestionPage.AFFECTATIONS}))
    this.store.dispatch(isSpinnerChange())
    this.Layout.initializeLayout(this.layoutConfig)
    this.getAffectations()
  }

  getAffectations=()=>{
    this.dataSource$=this.store.pipe(
      select(getAffectationsSuccessSelector),
      filter( val=> val !== undefined),
      map((affectation)=> affectation)
    )
  }

  filterApiCall():void{
    this.store.dispatch(getAffectationsStart())
  }


  constructor(
    private Layout:LayoutService,
    private store:Store<AppState>,
    ) { }
}
