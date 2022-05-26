import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { RubriqueBuilderService } from 'src/app/core/services/utils/builders/rubrique_builder/rubrique-builder.service';
import { RubriqueModel } from 'src/app/shared/models/rubrique.model';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';
import { getRubriqueStart, isModelProgressBarChange, modelPageChange, modelPageTypeChange, PostRubriqueStart, PutRubriqueStart, PutVariableStart } from '../../state/model.actions';
import { getRubriqueSuccessSelector } from '../../state/model.selectors';
import { ModelPage, ModelPageType } from '../../state/model.state';

@Component({
  selector: 'app-rubrique',
  templateUrl: './rubrique.component.html',
  styleUrls: ['./rubrique.component.scss']
})
export class RubriqueComponent implements OnInit {

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
  modelData$?:Observable<RubriqueModel | undefined>;

  ngOnInit(): void {

    let id:string | undefined=''
    this.store.dispatch(isModelProgressBarChange())
    this.actRoute.paramMap.subscribe(params => {
      id =<string | undefined>  params.get('id');
      this.store.dispatch(getRubriqueStart({id:id}))
    });
    this.store.dispatch(modelPageTypeChange({modelPageType:ModelPageType.LIST}))
    this.store.dispatch(modelPageChange({modelPage:ModelPage.RUBRIQUE}))
    this.Layout.initializeLayout(this.layoutConfig)
    this.getRubrique()
  }

  getRubrique=()=>{
    this.modelData$=this.store.pipe(
      select(getRubriqueSuccessSelector),
      filter( val=> val !== undefined),
      map((ville)=> ville)
    )
  }

  buildModelFromTempObj=(tempObj:any)=>{
    return this.rubriqueBuilder.buildRubriques([tempObj])![0]
  }

  putModel=(newModel:any)=>{
    this.store.dispatch(PutRubriqueStart({id:newModel.id,rubrique:newModel}))
  }

  postModel=(newModel:any)=>{
    this.store.dispatch(PostRubriqueStart({rubrique:newModel}))
  }

  constructor(
    private Layout:LayoutService,
    private store:Store<AppState>,
    private actRoute: ActivatedRoute,
    private rubriqueBuilder:RubriqueBuilderService
    ) { }
}
