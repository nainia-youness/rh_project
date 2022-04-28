import { Injectable } from '@angular/core';
import { ContratModel } from 'src/app/shared/models/contrat.model';

@Injectable({
  providedIn: 'root'
})
export class ContratBuilderService {


  constructor() { }

  buildContrat(id:number,label:string,description:string,path:string):ContratModel{
    return new ContratModel(id,label,description,path)
  }

  buildContrats(contrats:any):ContratModel[] | undefined{
    if(!contrats) return undefined
    let result:ContratModel[]=[]
    contrats.forEach((f:any)=> {
        const contrat=this.buildContrat(f.id,f.designation,f.description,f.path)
        result.push(contrat)
    });
    return result
  }
}
