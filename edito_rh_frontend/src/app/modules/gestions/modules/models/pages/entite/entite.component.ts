import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { EntiteBuilderService } from 'src/app/core/services/utils/builders/entite_builder/entite-builder.service';
import { EntiteModel } from 'src/app/shared/models/entite.model';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';
import { DeleteEntiteStart, getEntiteStart, isModelProgressBarChange, modelPageChange, modelPageTypeChange, PostEntiteStart, PutEntiteStart } from '../../state/model.actions';
import { getEntiteSuccessSelector } from '../../state/model.selectors';
import { ModelPage, ModelPageType } from '../../state/model.state';

@Component({
  selector: 'app-entite',
  templateUrl: './entite.component.html',
  styleUrls: ['./entite.component.scss']
})
export class EntiteComponent implements OnInit {

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
  modelData$?:Observable<EntiteModel | undefined>;

  ngOnInit(): void {
    let id:string | undefined=''
    this.store.dispatch(isModelProgressBarChange())
    this.actRoute.paramMap.subscribe(params => {
      id =<string | undefined>  params.get('id');
      this.store.dispatch(getEntiteStart({id:id}))
    });
    this.store.dispatch(modelPageTypeChange({modelPageType:ModelPageType.LIST}))
    this.store.dispatch(modelPageChange({modelPage:ModelPage.ENTITE}))
    this.Layout.initializeLayout(this.layoutConfig)
    this.getEntite()
  }

  getEntite=()=>{
    this.modelData$=this.store.pipe(
      select(getEntiteSuccessSelector),
      filter( val=> val !== undefined),
      map((entite)=> entite)
    )
  }

  buildModelFromTempObj=(tempObj:any)=>{
    return this.entiteBuilder.buildEntites([tempObj])![0]
  }

  putModel=(newModel:any)=>{
    this.store.dispatch(PutEntiteStart({id:newModel.id,entite:newModel}))
  }

  postModel=(newModel:any)=>{
    this.store.dispatch(PostEntiteStart({entite:newModel}))
  }

  deleteModel=(id:string)=>{
    this.store.dispatch(DeleteEntiteStart({id:id}))
  }

  constructor(
    private Layout:LayoutService,
    private store:Store<AppState>,
    private actRoute: ActivatedRoute,
    private entiteBuilder:EntiteBuilderService
    ) { }
}
