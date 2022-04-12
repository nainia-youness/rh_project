import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUserStart } from 'src/app/modules/auth/state/auth.actions';
import { SideNavItem } from 'src/app/shared/components/layout/state/layout.interface';
import { getSideNavItems } from 'src/app/shared/components/layout/state/layout.selector';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent implements OnInit {


  layoutConfig={
    sideNavItems:[
      {title:'Gestion des employés',path:'#'},
      {title:'Gestion des fonctions',path:'/gestion/fonctions'},
      {title:'Gestion des directions',path:'#'}
    ],
    showSideNav:true,
    showFooter:false,
  }
  sideNavItems$!:Observable<SideNavItem[]>
  ngOnInit(): void {
    this.Layout.initializeLayout(this.layoutConfig)
    this.sideNavItems$= this.store.select(getSideNavItems)
  }

  goToGestion=(path:string)=>{
    this.router.navigate([path])
  }

  constructor(
    private Layout:LayoutService,
    private store:Store<AppState>,
    private router :Router,
    ) { }
}
