import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { VariableModel } from 'src/app/shared/models/variable.model';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';
import { gestionPageChange, getVariablesStart } from '../../state/gestion.actions';
import { getVariablesSuccessSelector } from '../../state/gestion.selectors';
import { GestionPage } from '../../state/gestion.state';

@Component({
  selector: 'app-gestion-variables',
  templateUrl: './gestion-variables.component.html',
  styleUrls: ['./gestion-variables.component.scss']
})
export class GestionVariablesComponent implements OnInit {

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
  dataSource$?:Observable<VariableModel[] | undefined>;
  ngOnInit(): void {
    this.store.dispatch(getVariablesStart())
    this.store.dispatch(gestionPageChange({gestionPage:GestionPage.VARIABLES}))
    
    this.Layout.initializeLayout(this.layoutConfig)
    this.getVariables()
  }

  getVariables=()=>{
    this.dataSource$=this.store.pipe(
      select(getVariablesSuccessSelector),
      filter( val=> val !== undefined),
      map((variables)=> variables)
    )
  }

  filterApiCall():void{
    this.store.dispatch(getVariablesStart())
  }

  constructor(
    private Layout:LayoutService,
    private store:Store<AppState>,
    ) { }
}
