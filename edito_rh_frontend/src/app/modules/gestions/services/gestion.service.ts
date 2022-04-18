import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store,select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Fonction, FonctionModel } from 'src/app/shared/models/fonction.model';
import { AppState } from 'src/app/store/app.state';
import { filter,map } from 'rxjs/operators';
import { gestionPageSelector } from '../state/gestion.selectors';
import { GestionPage } from '../state/gestion.state';
import { VilleModel } from 'src/app/shared/models/ville.model';
import { EntiteModel } from 'src/app/shared/models/entite.model';
import { DirectionModel } from 'src/app/shared/models/direction.model';
import { ContratModel } from 'src/app/shared/models/contrat.model';
import { CentreCoutModel } from 'src/app/shared/models/centre_cout.model';

@Injectable({
  providedIn: 'root'
})
export class GestionService {


  getColumns=(gestionPage:string)=>{
    

    let result:any[]=[]
    if(gestionPage===GestionPage.FONCTIONS){
      result = this.getFonctionsColumns()
    }
    else if(gestionPage===GestionPage.VILLES){
      result = this.getVillesColumns()
    }
    else if(gestionPage===GestionPage.ENTITES){
      result = this.getEntitesColumns()
    }
    else if(gestionPage===GestionPage.DIRECTIONS){
      result = this.getDirectionsColumns()
    }
    else if(gestionPage===GestionPage.CONTRATS){
      result = this.getContratsColumns()
    }
    else if(gestionPage===GestionPage.CENTRES_COUT){
      result = this.getCentresCoutColumns()
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

  private getEntitesColumns=()=>{
    return [
      {
        columnDef: 'ID',
        header: 'ID',
        cell: (element: EntiteModel) => `${element.id ? element.id: ''}`,
      },
      {
        columnDef: 'Designation',
        header: 'Designation',
        cell: (element: EntiteModel) => `${element.designation ? element.designation :''}`,
      },
      {
        columnDef: 'Description',
        header: 'description',
        cell: (element: EntiteModel) => `${element.description ? element.description :''}`,
      },
    ];
  }

  private getDirectionsColumns=()=>{
    return [
      {
        columnDef: 'ID',
        header: 'ID',
        cell: (element: DirectionModel) => `${element.id ? element.id: ''}`,
      },
      {
        columnDef: 'Designation',
        header: 'Designation',
        cell: (element: DirectionModel) => `${element.designation ? element.designation :''}`,
      },
      {
        columnDef: 'Description',
        header: 'description',
        cell: (element: DirectionModel) => `${element.description ? element.description :''}`,
      },
    ];
  }

  private getContratsColumns=()=>{
    return [
      {
        columnDef: 'ID',
        header: 'ID',
        cell: (element: ContratModel) => `${element.id ? element.id: ''}`,
      },
      {
        columnDef: 'Designation',
        header: 'Designation',
        cell: (element: ContratModel) => `${element.designation ? element.designation :''}`,
      },
      {
        columnDef: 'Description',
        header: 'description',
        cell: (element: ContratModel) => `${element.description ? element.description :''}`,
      },
    ];
  }

  private getCentresCoutColumns=()=>{
    return [
      {
        columnDef: 'ID',
        header: 'ID',
        cell: (element: CentreCoutModel) => `${element.id ? element.id: ''}`,
      },
      {
        columnDef: 'Designation',
        header: 'Designation',
        cell: (element: CentreCoutModel) => `${element.designation ? element.designation :''}`,
      },
      {
        columnDef: 'Description',
        header: 'description',
        cell: (element: CentreCoutModel) => `${element.description ? element.description :''}`,
      },
    ];
  }
  private getVillesColumns=()=>{
    return [
      {
        columnDef: 'ID',
        header: 'ID',
        cell: (element: VilleModel) => `${element.id ? element.id: ''}`,
      },
      {
        columnDef: 'Nom',
        header: 'Nom',
        cell: (element: VilleModel) => `${element.nom ? element.nom :''}`,
      },
    ];
  }

  constructor(
    private router:Router,
    private store:Store<AppState>,
  ) { }
}
