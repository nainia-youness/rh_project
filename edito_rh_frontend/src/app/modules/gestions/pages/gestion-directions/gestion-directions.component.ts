import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { DirectionModel } from 'src/app/shared/models/direction.model';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';
import { gestionPageChange, getDirectionsStart } from '../../state/gestion.actions';
import { getDirectionsSuccessSelector } from '../../state/gestion.selectors';
import { GestionPage } from '../../state/gestion.state';

@Component({
  selector: 'app-gestion-directions',
  templateUrl: './gestion-directions.component.html',
  styleUrls: ['./gestion-directions.component.scss']
})
export class GestionDirectionsComponent implements OnInit {

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
    ],
    showSideNav:true,
    showFooter:false,
  }
  dataSource$?:Observable<DirectionModel[] | undefined>;
  ngOnInit(): void {
    this.store.dispatch(getDirectionsStart())
    this.store.dispatch(gestionPageChange({gestionPage:GestionPage.DIRECTIONS}))
    
    this.Layout.initializeLayout(this.layoutConfig)
    this.getDirections()
  }

  getDirections=()=>{
    this.dataSource$=this.store.pipe(
      select(getDirectionsSuccessSelector),
      filter( val=> val !== undefined),
      map((directions)=> directions)
    )
  }

  filterApiCall():void{
    this.store.dispatch(getDirectionsStart())
  }


  constructor(
    private Layout:LayoutService,
    private store:Store<AppState>,
    ) { }

}