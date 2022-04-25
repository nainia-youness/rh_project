import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { ContratModel } from 'src/app/shared/models/contrat.model';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';
import { gestionPageChange, getContratsStart, isSpinnerChange } from '../../state/gestion.actions';
import { getContratsSuccessSelector } from '../../state/gestion.selectors';
import { GestionPage } from '../../state/gestion.state';

@Component({
  selector: 'app-gestion-contrats',
  templateUrl: './gestion-contrats.component.html',
  styleUrls: ['./gestion-contrats.component.scss']
})
export class GestionContratsComponent implements OnInit {


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
  dataSource$?:Observable<ContratModel[] | undefined>;
  ngOnInit(): void {
    this.store.dispatch(getContratsStart())
    this.store.dispatch(gestionPageChange({gestionPage:GestionPage.CONTRATS}))
    this.store.dispatch(isSpinnerChange())
    this.Layout.initializeLayout(this.layoutConfig)
    this.getContrats()
  }

  getContrats=()=>{
    this.dataSource$=this.store.pipe(
      select(getContratsSuccessSelector),
      filter( val=> val !== undefined),
      map((contrats)=> contrats)
    )
  }

  filterApiCall():void{
    this.store.dispatch(getContratsStart())
  }


  constructor(
    private Layout:LayoutService,
    private store:Store<AppState>,
    ) { }

}
