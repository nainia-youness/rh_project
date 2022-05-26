import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { DirectionBuilderService } from 'src/app/core/services/utils/builders/direction_builder/direction-builder.service';
import { DirectionModel } from 'src/app/shared/models/direction.model';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';
import { getDirectionStart, isModelProgressBarChange, modelPageChange, modelPageTypeChange, PostDirectionStart, PutDirectionStart } from '../../state/model.actions';
import { getDirectionSuccessSelector } from '../../state/model.selectors';
import { ModelPage, ModelPageType } from '../../state/model.state';

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss']
})
export class DirectionComponent implements OnInit {

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
  modelData$?:Observable<DirectionModel | undefined>;

  ngOnInit(): void {

    let id:string | undefined=''
    this.store.dispatch(isModelProgressBarChange())
    this.actRoute.paramMap.subscribe(params => {
      id =<string | undefined>  params.get('id');
      this.store.dispatch(getDirectionStart({id:id}))
    });
    this.store.dispatch(modelPageTypeChange({modelPageType:ModelPageType.LIST}))
    this.store.dispatch(modelPageChange({modelPage:ModelPage.DIRECTION}))
    this.Layout.initializeLayout(this.layoutConfig)
    this.getDirection()
  }

  getDirection=()=>{
    this.modelData$=this.store.pipe(
      select(getDirectionSuccessSelector),
      filter( val=> val !== undefined),
      map((direction)=> direction)
    )
  }

  buildModelFromTempObj=(tempObj:any)=>{
    return this.directionBuilder.buildDirections([tempObj])![0]
  }

  putModel=(newModel:any)=>{
    this.store.dispatch(PutDirectionStart({id:newModel.id,direction:newModel}))
  }

  postModel=(newModel:any)=>{
    this.store.dispatch(PostDirectionStart({direction:newModel}))
  }

  constructor(
    private Layout:LayoutService,
    private store:Store<AppState>,
    private actRoute: ActivatedRoute,
    private directionBuilder:DirectionBuilderService,
    ) { }

}
