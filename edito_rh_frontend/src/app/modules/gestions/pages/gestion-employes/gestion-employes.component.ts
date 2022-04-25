import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { EmployeModel } from 'src/app/shared/models/employe.model';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';
import { gestionPageChange, getEmployesStart, isSpinnerChange } from '../../state/gestion.actions';
import { getEmployesSuccessSelector } from '../../state/gestion.selectors';
import { GestionPage } from '../../state/gestion.state';

@Component({
  selector: 'app-gestion-employes',
  templateUrl: './gestion-employes.component.html',
  styleUrls: ['./gestion-employes.component.scss']
})
export class GestionEmployesComponent implements OnInit {

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
  dataSource$?:Observable<EmployeModel[] | undefined>;
  ngOnInit(): void {
    this.store.dispatch(getEmployesStart())
    this.store.dispatch(gestionPageChange({gestionPage:GestionPage.EMPLOYES}))
    this.store.dispatch(isSpinnerChange())
    this.Layout.initializeLayout(this.layoutConfig)
    this.getEmployes()
  }

  getEmployes=()=>{
    this.dataSource$=this.store.pipe(
      select(getEmployesSuccessSelector),
      filter( val=> val !== undefined),
      map((employes)=> employes)
    )
  }

  filterApiCall():void{
    this.store.dispatch(getEmployesStart())
  }


  constructor(
    private Layout:LayoutService,
    private store:Store<AppState>,
    ) { }


}
