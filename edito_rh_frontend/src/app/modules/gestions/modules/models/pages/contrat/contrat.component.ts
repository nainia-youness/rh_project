import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { ContratModel } from 'src/app/shared/models/contrat.model';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';
import { getContratStart, isModelProgressBarChange, modelPageChange } from '../../state/model.actions';
import { getContratSuccessSelector } from '../../state/model.selectors';
import { ModelPage } from '../../state/model.state';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.scss']
})
export class ContratComponent implements OnInit {

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
    showFooter:true,
  }
  modelData$?:Observable<ContratModel | undefined>;

  ngOnInit(): void {

    let id =this.actRoute.snapshot.params['id'];
    this.store.dispatch(isModelProgressBarChange())
    this.store.dispatch(getContratStart(id))
    this.store.dispatch(modelPageChange({modelPage:ModelPage.CONTRAT}))
    this.Layout.initializeLayout(this.layoutConfig)
    this.getContrat()
  }

  getContrat=()=>{
    this.modelData$=this.store.pipe(
      select(getContratSuccessSelector),
      filter( val=> val !== undefined),
      map((contrat)=> contrat)
    )
  }
  constructor(
    private Layout:LayoutService,
    private store:Store<AppState>,
    private actRoute: ActivatedRoute
    ) { }
}
