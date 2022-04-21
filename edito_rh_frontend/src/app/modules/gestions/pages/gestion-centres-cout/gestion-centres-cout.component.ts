import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { CentreCoutModel } from 'src/app/shared/models/centre_cout.model';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';
import { gestionPageChange, getCentresCoutStart } from '../../state/gestion.actions';
import { getCentresCoutSuccessSelector } from '../../state/gestion.selectors';
import { GestionPage } from '../../state/gestion.state';

@Component({
  selector: 'app-gestion-centres-cout',
  templateUrl: './gestion-centres-cout.component.html',
  styleUrls: ['./gestion-centres-cout.component.scss']
})
export class GestionCentresCoutComponent implements OnInit {

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
  dataSource$?:Observable<CentreCoutModel[] | undefined>;
  ngOnInit(): void {
    this.store.dispatch(getCentresCoutStart())
    this.store.dispatch(gestionPageChange({gestionPage:GestionPage.CENTRES_COUT}))
    
    this.Layout.initializeLayout(this.layoutConfig)
    this.getCentresCout()
  }

  getCentresCout=()=>{
    this.dataSource$=this.store.pipe(
      select(getCentresCoutSuccessSelector),
      filter( val=> val !== undefined),
      map((centres_cout)=> centres_cout)
    )
  }

  filterApiCall():void{
    this.store.dispatch(getCentresCoutStart())
  }


  constructor(
    private Layout:LayoutService,
    private store:Store<AppState>,
    ) { }

}
