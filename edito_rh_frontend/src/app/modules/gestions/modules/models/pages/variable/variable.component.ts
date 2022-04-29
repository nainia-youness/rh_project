import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { VariableBuilderService } from 'src/app/core/services/utils/builders/variable_builder/variable-builder.service';
import { VariableModel } from 'src/app/shared/models/variable.model';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';
import { getVariableStart, isModelProgressBarChange, modelPageChange, modelPageTypeChange } from '../../state/model.actions';
import { getVariableSuccessSelector } from '../../state/model.selectors';
import { ModelPage, ModelPageType } from '../../state/model.state';

@Component({
  selector: 'app-variable',
  templateUrl: './variable.component.html',
  styleUrls: ['./variable.component.scss']
})
export class VariableComponent implements OnInit {

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
  modelData$?:Observable<VariableModel | undefined>;

  ngOnInit(): void {

    let id:string | undefined=''
    this.store.dispatch(isModelProgressBarChange())
    this.actRoute.paramMap.subscribe(params => {
      id =<string | undefined>  params.get('id');
      this.store.dispatch(getVariableStart({id:id}))
    });
    this.store.dispatch(modelPageTypeChange({modelPageType:ModelPageType.LIST}))
    this.store.dispatch(modelPageChange({modelPage:ModelPage.VARIABLE}))
    this.Layout.initializeLayout(this.layoutConfig)
    this.getVariable()
  }

  getVariable=()=>{
    this.modelData$=this.store.pipe(
      select(getVariableSuccessSelector),
      filter( val=> val !== undefined),
      map((variable)=> variable)
    )
  }

  buildModelFromTempObj=(tempObj:any)=>{
    return this.variableBuilder.buildVariables([tempObj])![0]
  }

  constructor(
    private Layout:LayoutService,
    private store:Store<AppState>,
    private actRoute: ActivatedRoute,
    private variableBuilder:VariableBuilderService
    ) { }
}
