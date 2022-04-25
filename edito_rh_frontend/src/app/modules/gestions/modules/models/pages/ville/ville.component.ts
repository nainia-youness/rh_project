import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SideNavItem } from 'src/app/shared/components/layout/state/layout.interface';
import { getSideNavItems } from 'src/app/shared/components/layout/state/layout.selector';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';
import { modelPageChange } from '../../state/model.actions';
import { ModelPage } from '../../state/model.state';

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
    showFooter:false,
  }
  sideNavItems$!:Observable<SideNavItem[]>
  
  ngOnInit(): void {
    this.store.dispatch(modelPageChange({modelPage:ModelPage.VILLE}))
    this.Layout.initializeLayout(this.layoutConfig)
    this.sideNavItems$= this.store.select(getSideNavItems)
  }

  constructor(
    private Layout:LayoutService,
    private store:Store<AppState>,
    private router :Router,
    ) { }
}