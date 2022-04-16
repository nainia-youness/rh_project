import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store,select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Fonction, FonctionModel } from 'src/app/shared/models/fonction.model';
import { AppState } from 'src/app/store/app.state';
import { filter,map } from 'rxjs/operators';
import { gestionPageSelector } from '../state/gestion.selectors';
import { GestionPage } from '../state/gestion.state';

@Injectable({
  providedIn: 'root'
})
export class GestionService {


  getColumns=(gestionPage:string)=>{
    

    let result:any[]=[]
    if(gestionPage===GestionPage.FONCTIONS){
      result = this.getFonctionsColumns()
    }
    return result
  }

  private getFonctionsColumns=()=>{
    return [
      /*{
        columnDef: '',
        header: '',
        cell: (element:any) => `${"hi"}`,
      },*/
      {
        columnDef: 'ID',
        header: 'ID',
        cell: (element: FonctionModel) => `${element.id ? element.id: ''}`,
      },
      {
        columnDef: 'Designation',
        header: 'Designation',
        cell: (element: FonctionModel) => `${element.designation ? element.designation :''}`,
      },
      {
        columnDef: 'Description',
        header: 'description',
        cell: (element: FonctionModel) => `${element.description ? element.description :''}`,
      },
    ];
  }

  constructor(
    private router:Router,
    private store:Store<AppState>,
  ) { }
}
