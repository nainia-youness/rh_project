import { Injectable } from '@angular/core';
import { EntiteModel } from 'src/app/shared/models/entite.model';

@Injectable({
  providedIn: 'root'
})
export class EntiteBuilderService {

  constructor() { }

  buildEntite(id:number,label:string,description:string):EntiteModel{
    return new EntiteModel(id,label,description)
  }

  buildEntites(entites:any):EntiteModel[] | undefined{
    if(!entites) return undefined
    let result:EntiteModel[]=[]
    entites.forEach((f:any)=> {
        const entite=this.buildEntite(f.id,f.designation,f.description)
        result.push(entite)
    });
    return result
  }
}
