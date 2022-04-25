import { Injectable } from '@angular/core';
import { AffectationModel } from 'src/app/shared/models/affectation.model';
import { CentreCoutModel } from 'src/app/shared/models/centre_cout.model';
import { ContratModel } from 'src/app/shared/models/contrat.model';
import { DelegueModel } from 'src/app/shared/models/delegue.model';
import { DirectionModel } from 'src/app/shared/models/direction.model';
import { EmployeModel } from 'src/app/shared/models/employe.model';
import { EntiteModel } from 'src/app/shared/models/entite.model';
import { FonctionModel } from 'src/app/shared/models/fonction.model';
import { VilleModel } from 'src/app/shared/models/ville.model';
import { AffectationBuilderService } from '../affectation_builder/affectation-builder.service';
import { CentreCoutBuilderService } from '../centre_cout_builder/centre-cout-builder.service';
import { ContratBuilderService } from '../contrat_builder/contrat-builder.service';
import { DirectionBuilderService } from '../direction_builder/direction-builder.service';
import { EntiteBuilderService } from '../entite_builder/entite-builder.service';
import { FonctionBuilderService } from '../fonction_builder/fonction-builder.service';
import { VilleBuilderService } from '../ville_builder/ville-builder.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeBuilderService {

  buildEmploye(
    id:number,
    matricule:string,
    nom:string,
    prenom:string,
    date_naissance:Date,
    sexe:string,
    cin:string,
    date_entree:Date,
    situation_familiale:number,
    nombre_enfant:number,
    charge_familiale:number,
    adresse:string,
    nationalite:string,
    cnss:string,
    salaire:number,
    numero_compte:number,
    participation:number,
    date_sortie:Date,
    fonction:FonctionModel,
    centre_cout:CentreCoutModel,
    direction:DirectionModel,
    ville:VilleModel,
    contrat:ContratModel,
    affectation:AffectationModel,
    entite:EntiteModel,
    delegue:DelegueModel
  ):EmployeModel{
    return new EmployeModel(    
      id,
      matricule,
      nom,
      prenom,
      date_naissance,
      sexe,
      cin,
      date_entree,
      situation_familiale,
      nombre_enfant,
      charge_familiale,
      adresse,
      nationalite,
      cnss,
      salaire,
      numero_compte,
      participation,
      date_sortie,
      fonction,
      centre_cout,
      direction,
      ville,
      contrat,
      affectation,
      entite,
      delegue)
  }

  buildEmployes(employes:any):EmployeModel[] | undefined{
    if(!employes) return undefined
    let result:EmployeModel[]=[]
    employes.forEach((f:any)=> {
        const fonction=this.fonctionBuilder.buildFonction(f.fonction.id,f.fonction.designation,f.fonction.description)
        const centre_cout=this.centreCoutBuilder.buildCentreCout(f.centre_cout.id,f.centre_cout.designation,f.centre_cout.description)
        const direction=this.directionBuilder.buildDirection(f.direction.id,f.direction.designation,f.direction.description)
        const ville=this.villeBuilder.buildVille(f.ville.id,f.ville.nom)
        const contrat=this.contratBuilder.buildContrat(f.contrat.id,f.contrat.designation,f.contrat.description)
        const affectation=this.affectationBuilder.buildAffectation(f.affectation.id,f.affectation.designation,f.affectation.description)
        const entite=this.entiteBuilder.buildEntite(f.entite.id,f.entite.designation,f.entite.description)
        let delegue:any={}
        if(f.delegue){
          /*delegue=this.buildEmploye(f.delegue.id,f.delegue.matricule,f.delegue.nom,f.delegue.prenom,f.delegue.date_naissance,f.delegue.sexe,f.delegue.cin,f.delegue.date_entree,
            f.delegue.situation_familiale,f.delegue.nombre_enfant,f.delegue.charge_familiale,f.delegue.adresse,f.delegue.nationalite,f.delegue.cnss,f.delegue.salaire,
            f.delegue.numero_compte,f.delegue.participation,f.delegue.date_sortie,f.delegue.fonction,f.delegue.centre_cout,f.delegue.direction,f.delegue.ville,f.delegue.contrat,
            f.delegue.affectation,f.delegue.entite,f.delegue.delegue)*/
            delegue=new DelegueModel(f.delegue.id,f.delegue.matricule,f.delegue.nom,f.delegue.prenom)
            //console.log(delegue)
        }

        const employe=this.buildEmploye(      
          f.id,
          f.matricule,
          f.nom,
          f.prenom,
          f.date_naissance,
          f.sexe,
          f.cin,
          f.date_entree,
          f.situation_familiale,
          f.nombre_enfant,
          f.charge_familiale,
          f.adresse,
          f.nationalite,
          f.cnss,
          f.salaire,
          f.numero_compte,
          f.participation,
          f.date_sortie,
          fonction,
          centre_cout,
          direction,
          ville,
          contrat,
          affectation,
          entite,
          delegue)
        result.push(employe)
    });
    return result
  }

  constructor(        
    private fonctionBuilder:FonctionBuilderService,
    private villeBuilder:VilleBuilderService,
    private entiteBuilder:EntiteBuilderService,
    private directionBuilder:DirectionBuilderService,
    private contratBuilder:ContratBuilderService,
    private centreCoutBuilder:CentreCoutBuilderService,
    private affectationBuilder:AffectationBuilderService,
    ) { }
}
