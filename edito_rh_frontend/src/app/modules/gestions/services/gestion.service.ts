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
import { AffectationModel } from 'src/app/shared/models/affectation.model';
import { EmployeModel } from 'src/app/shared/models/employe.model';
import { DelegueModel } from 'src/app/shared/models/delegue.model';
import { RubriqueModel } from 'src/app/shared/models/rubrique.model';
import { FormuleModel } from 'src/app/shared/models/formule.model';
import { VariableModel } from 'src/app/shared/models/variable.model';

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
    else if(gestionPage===GestionPage.AFFECTATIONS){
      result = this.getAffectationsColumns()
    }
    else if(gestionPage===GestionPage.EMPLOYES){
      result = this.getEmployesColumns()
    }
    else if(gestionPage===GestionPage.RUBRIQUES){
      result = this.getRubriquesColumns()
    }
    else if(gestionPage===GestionPage.FORMULES){
      result = this.getFormulesColumns()
    }
    else if(gestionPage===GestionPage.VARIABLES){
      result = this.getVariablesColumns()
    }
    return result
  }

  private getVariablesColumns=()=>{
    return [
      {
        columnDef: 'ID',
        header: 'ID',
        cell: (element: VariableModel) => `${element.id ? element.id: ''}`,
      },
      {
        columnDef: 'Designation',
        header: 'Designation',
        cell: (element: VariableModel) => `${element.designation ? element.designation :''}`,
      },
      {
        columnDef: 'Description',
        header: 'description',
        cell: (element: VariableModel) => `${element.valeur ? element.valeur :''}`,
      },
    ];
  }

  private getRubriquesColumns=()=>{
    return [
      {
        columnDef: 'ID',
        header: 'ID',
        cell: (element: RubriqueModel) => `${element.id ? element.id: ''}`,
      },
      {
        columnDef: 'Designation',
        header: 'Designation',
        cell: (element: RubriqueModel) => `${element.designation ? element.designation :''}`,
      },
      {
        columnDef: 'Description',
        header: 'description',
        cell: (element: RubriqueModel) => `${element.description ? element.description :''}`,
      },
    ];
  }

  private getFormulesColumns=()=>{
    return [
      {
        columnDef: 'ID',
        header: 'ID',
        cell: (element: FormuleModel) => `${element.id ? element.id: ''}`,
      },
      {
        columnDef: 'Designation',
        header: 'Designation',
        cell: (element: FormuleModel) => `${element.designation ? element.designation :''}`,
      },
      {
        columnDef: 'Formule',
        header: 'formule',
        cell: (element: FormuleModel) => `${element.formule ? element.formule :''}`,
      },
    ];
  }

  private getAffectationsColumns=()=>{
    return [
      {
        columnDef: 'ID',
        header: 'ID',
        cell: (element: AffectationModel) => `${element.id ? element.id: ''}`,
      },
      {
        columnDef: 'Designation',
        header: 'Designation',
        cell: (element: AffectationModel) => `${element.designation ? element.designation :''}`,
      },
      {
        columnDef: 'Description',
        header: 'description',
        cell: (element: AffectationModel) => `${element.description ? element.description :''}`,
      },
    ];
  }

  
  private getEmployesColumns=()=>{
    return [
      {
        columnDef: 'ID',
        header: 'ID',
        cell: (element: EmployeModel) => `${element.id ? element.id: ''}`,
      },
      {
        columnDef: 'Matricule',
        header: 'Matricule',
        cell: (element: EmployeModel) => `${element.matricule ? element.matricule :''}`,
      },
      {
        columnDef: 'Nom',
        header: 'Nom',
        cell: (element: EmployeModel) => `${element.nom ? element.nom :''}`,
      },
      {
        columnDef: 'Prenom',
        header: 'Prenom',
        cell: (element: EmployeModel) => `${element.prenom ? element.prenom :''}`,
      },
      {
        columnDef: 'Date naissance',
        header: 'Date naissance',
        cell: (element: EmployeModel) => `${element.date_naissance ? element.date_naissance :''}`,
      },
      {
        columnDef: 'Sexe',
        header: 'Sexe',
        cell: (element: EmployeModel) => `${element.sexe ? element.sexe :''}`,
      },
      {
        columnDef: 'Cin',
        header: 'Cin',
        cell: (element: EmployeModel) => `${element.cin ? element.cin :''}`,
      },
      {
        columnDef: 'Date entrée',
        header: 'date entrée',
        cell: (element: EmployeModel) => `${element.date_entree ? element.date_entree :''}`,
      },
      {
        columnDef: 'Situation familiale',
        header: 'Situation familiale',
        cell: (element: EmployeModel) => `${element.situation_familiale ? element.situation_familiale :''}`,
      },
      {
        columnDef: 'Charge familiale',
        header: 'Charge familiale',
        cell: (element: EmployeModel) => `${element.charge_familiale ? element.charge_familiale :''}`,
      },
      {
        columnDef: 'Adresse',
        header: 'Adresse',
        cell: (element: EmployeModel) => `${element.adresse ? element.adresse :''}`,
      },
      {
        columnDef: 'Nationalite',
        header: 'Nationalite',
        cell: (element: EmployeModel) => `${element.nationalite ? element.nationalite :''}`,
      },
      {
        columnDef: 'Cnss',
        header: 'Cnss',
        cell: (element: EmployeModel) => `${element.cnss ? element.cnss :''}`,
      },
      {
        columnDef: 'Salaire',
        header: 'Salaire',
        cell: (element: EmployeModel) => `${element.salaire ? element.salaire :''}`,
      },
      {
        columnDef: 'Numero compte',
        header: 'Numero compte',
        cell: (element: EmployeModel) => `${element.numero_compte ? element.numero_compte :''}`,
      },
      {
        columnDef: 'Participation',
        header: 'Participation',
        cell: (element: EmployeModel) => `${element.participation ? element.participation :''}`,
      },
      {
        columnDef: 'Date sortie',
        header: 'Date sortie',
        cell: (element: EmployeModel) => `${element.date_sortie ? element.date_sortie :''}`,
      },
      {
        columnDef: 'fonction',
        header: 'fonction',
        cell: (element: EmployeModel) => `${element.fonction ? element.fonction.designation :''}`,
      },
      {
        columnDef: 'centre_cout',
        header: 'centre_cout',
        cell: (element: EmployeModel) => `${element.centre_cout ? element.centre_cout.designation :''}`,
      },
      {
        columnDef: 'direction',
        header: 'direction',
        cell: (element: EmployeModel) => `${element.direction ? element.direction.designation :''}`,
      },
      {
        columnDef: 'ville',
        header: 'ville',
        cell: (element: EmployeModel) => `${element.ville ? element.ville.nom :''}`,
      },
      {
        columnDef: 'contrat',
        header: 'contrat',
        cell: (element: EmployeModel) => `${element.contrat ? element.contrat.designation :''}`,
      },
      {
        columnDef: 'affectation',
        header: 'affectation',
        cell: (element: EmployeModel) => `${element.affectation ? element.affectation.designation :''}`,
      },
      {
        columnDef: 'delegue',
        header: 'delegue',
        cell: (element: EmployeModel) => `${element.delegue && element.delegue.id ? `${element.delegue.prenom} ${element.delegue.nom}` :''}`
      },
    ];
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
