import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { VilleBuilderService } from 'src/app/core/services/utils/builders/ville_builder/ville-builder.service';
import { SideNavItem } from 'src/app/shared/components/layout/state/layout.interface';
import { getSideNavItems } from 'src/app/shared/components/layout/state/layout.selector';
import { VilleModel } from 'src/app/shared/models/ville.model';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';
import { getVilleStart, isModelProgressBarChange, modelPageChange, modelPageTypeChange, PutVilleStart } from '../../state/model.actions';
import { getVilleSuccessSelector } from '../../state/model.selectors';
import { ModelPage, ModelPageType } from '../../state/model.state';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.scss']
})
export class VilleComponent implements OnInit {

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
  modelData$?:Observable<VilleModel | undefined>;

  ngOnInit(): void {

    let id:string | undefined=''
    this.store.dispatch(isModelProgressBarChange())
    this.actRoute.paramMap.subscribe(params => {
      id =<string | undefined>  params.get('id');
      this.store.dispatch(getVilleStart({id:id}))
    });
    this.store.dispatch(modelPageTypeChange({modelPageType:ModelPageType.LIST}))
    this.store.dispatch(modelPageChange({modelPage:ModelPage.VILLE}))
    this.Layout.initializeLayout(this.layoutConfig)
    this.getVille()
  }

  getVille=()=>{
    this.modelData$=this.store.pipe(
      select(getVilleSuccessSelector),
      filter( val=> val !== undefined),
      map((ville)=> {
        console.log('yaaaaaaaaaaaaaaaaaaaaaaaaaay')
        console.log(ville)
        return ville
      })
    )
  }

  buildModelFromTempObj=(tempObj:any)=>{
    return this.villeBuilder.buildVilles([tempObj])![0]
  }

  putModel=(newModel:any)=>{
    this.store.dispatch(PutVilleStart({id:newModel.id,ville:newModel}))
  }

  constructor(
    private Layout:LayoutService,
    private store:Store<AppState>,
    private actRoute: ActivatedRoute,
    private villeBuilder:VilleBuilderService
    ) { }
}
