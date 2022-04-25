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
