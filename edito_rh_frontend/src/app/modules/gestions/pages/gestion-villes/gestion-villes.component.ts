import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { VilleModel } from 'src/app/shared/models/ville.model';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';
import { gestionPageChange, getVillesStart } from '../../state/gestion.actions';
import { getVillesSuccessSelector } from '../../state/gestion.selectors';
import { GestionPage } from '../../state/gestion.state';

@Component({
  selector: 'app-gestion-villes',
  templateUrl: './gestion-villes.component.html',
  styleUrls: ['./gestion-villes.component.scss']
})
export class GestionVillesComponent implements OnInit {
  
  layoutConfig={
    sideNavItems:[
      {title:'Gestion des fonctions',path:'/gestion/fonctions'},
      {title:'Gestion des villes',path:'/gestion/villes'},
      {title:'Gestion des entités',path:'/gestion/entités'},
      {title:'Gestion des directions',path:'/gestion/directions'},
      {title:'Gestion des contrats',path:'/gestion/contrats'},
      {title:'Gestion des centres-cout',path:'/gestion/centres-cout'}
    ],
    showSideNav:true,
    showFooter:false,
  }
  dataSource$?:Observable<VilleModel[] | undefined>;
  ngOnInit(): void {
    this.store.dispatch(getVillesStart())
    this.store.dispatch(gestionPageChange({gestionPage:GestionPage.VILLES}))
    
    this.Layout.initializeLayout(this.layoutConfig)
    this.getVilles()
  }

  getVilles=()=>{
    this.dataSource$=this.store.pipe(
      select(getVillesSuccessSelector),
      filter( val=> val !== undefined),
      map((villes)=> villes)
    )
  }

  filterApiCall():void{
    this.store.dispatch(getVillesStart())
  }


  constructor(
    private Layout:LayoutService,
    private store:Store<AppState>,
    ) { }
}
