import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { CentreCoutModel } from 'src/app/shared/models/centre_cout.model';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';
import { getCentreCoutStart, isModelProgressBarChange, modelPageChange } from '../../state/model.actions';
import { getCentreCoutSuccessSelector } from '../../state/model.selectors';
import { ModelPage } from '../../state/model.state';

@Component({
  selector: 'app-centre-cout',
  templateUrl: './centre-cout.component.html',
  styleUrls: ['./centre-cout.component.scss']
})
export class CentreCoutComponent implements OnInit {

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
  modelData$?:Observable<CentreCoutModel | undefined>;

  ngOnInit(): void {

    let id =this.actRoute.snapshot.params['id'];
    this.store.dispatch(isModelProgressBarChange())
    this.store.dispatch(getCentreCoutStart(id))
    this.store.dispatch(modelPageChange({modelPage:ModelPage.CENTRE_COUT}))
    this.Layout.initializeLayout(this.layoutConfig)
    this.getCentreCout()
  }

  getCentreCout=()=>{
    this.modelData$=this.store.pipe(
      select(getCentreCoutSuccessSelector),
      filter( val=> val !== undefined),
      map((centreCout)=> centreCout)
    )
  }
  constructor(
    private Layout:LayoutService,
    private store:Store<AppState>,
    private actRoute: ActivatedRoute
    ) { }
}