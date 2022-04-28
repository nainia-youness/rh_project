import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { FonctionModel } from 'src/app/shared/models/fonction.model';
import { AppState } from 'src/app/store/app.state';
import { modelPageTypeChange } from '../../modules/models/state/model.actions';
import { ModelPageType } from '../../modules/models/state/model.state';
import { GestionService } from '../../services/gestion.service';
import { gestionPageSelector } from '../../state/gestion.selectors';
import { GestionPage } from '../../state/gestion.state';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() dataSource$?:Observable<FonctionModel[] | undefined>;
  @Input() displayedColumns:any
  @Input() columns:any[]=[]

  ngOnInit(): void {
  }

  goToModel=(row:any)=>{
    const id=row.id
    this.store.dispatch(modelPageTypeChange({modelPageType:ModelPageType.LIST}))
    const obs=this.store.pipe(
      select(gestionPageSelector),
      map((gestionPage:GestionPage)=> {
        if(gestionPage===GestionPage.VILLES){
          this.router.navigate([`/gestion/villes/${id}`])
        }
        if(gestionPage===GestionPage.VARIABLES){
          this.router.navigate([`/gestion/variables/${id}`])
        }
        if(gestionPage===GestionPage.FORMULES){
          this.router.navigate([`/gestion/formules/${id}`])
        }
        if(gestionPage===GestionPage.AFFECTATIONS){
          this.router.navigate([`/gestion/affectations/${id}`])
        }
        if(gestionPage===GestionPage.CENTRES_COUT){
          this.router.navigate([`/gestion/centres-cout/${id}`])
        }
        if(gestionPage===GestionPage.CONTRATS){
          this.router.navigate([`/gestion/contrats/${id}`])
        }
        if(gestionPage===GestionPage.DIRECTIONS){
          this.router.navigate([`/gestion/directions/${id}`])
        }
        if(gestionPage===GestionPage.ENTITES){
          this.router.navigate([`/gestion/entités/${id}`])
        }
        if(gestionPage===GestionPage.FONCTIONS){
          this.router.navigate([`/gestion/fonctions/${id}`])
        }
        if(gestionPage===GestionPage.RUBRIQUES){
          this.router.navigate([`/gestion/rubriques/${id}`])
        }
        if(gestionPage===GestionPage.EMPLOYES){
          this.router.navigate([`/gestion/employés/${id}`])
        }
        return gestionPage
      })
    ).subscribe()
    obs.unsubscribe()
  }

  constructor(
    private store:Store<AppState>,
    private gestionService:GestionService,
    private router:Router
    ) { }
}
