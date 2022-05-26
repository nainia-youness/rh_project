import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { FormuleBuilderService } from 'src/app/core/services/utils/builders/formule_builder/formule-builder.service';
import { FormuleModel } from 'src/app/shared/models/formule.model';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';
import { getFormuleStart, isModelProgressBarChange, modelPageChange, modelPageTypeChange, PostFormuleStart, PutFormuleStart } from '../../state/model.actions';
import { getFormuleSuccessSelector } from '../../state/model.selectors';
import { ModelPage, ModelPageType } from '../../state/model.state';

@Component({
  selector: 'app-formule',
  templateUrl: './formule.component.html',
  styleUrls: ['./formule.component.scss']
})
export class FormuleComponent implements OnInit {

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
  modelData$?:Observable<FormuleModel | undefined>;

  ngOnInit(): void {

    let id:string | undefined=''
    this.store.dispatch(isModelProgressBarChange())
    this.actRoute.paramMap.subscribe(params => {
      id =<string | undefined>  params.get('id');
      this.store.dispatch(getFormuleStart({id:id}))
    });
    this.store.dispatch(modelPageTypeChange({modelPageType:ModelPageType.LIST}))
    this.store.dispatch(modelPageChange({modelPage:ModelPage.FORMULE}))
    this.Layout.initializeLayout(this.layoutConfig)
    this.getFormule()
  }

  getFormule=()=>{
    this.modelData$=this.store.pipe(
      select(getFormuleSuccessSelector),
      filter( val=> val !== undefined),
      map((formule)=> formule)
    )
  }

  buildModelFromTempObj=(tempObj:any)=>{
    return this.formuleBuilder.buildFormules([tempObj],true)![0]
  }

  putModel=(newModel:any)=>{
    this.store.dispatch(PutFormuleStart({id:newModel.id,formule:newModel}))
  }

  postModel=(newModel:any)=>{
    this.store.dispatch(PostFormuleStart({formule:newModel}))
  }

  constructor(
    private Layout:LayoutService,
    private store:Store<AppState>,
    private actRoute: ActivatedRoute,
    private formuleBuilder:FormuleBuilderService
    ) { }
}
