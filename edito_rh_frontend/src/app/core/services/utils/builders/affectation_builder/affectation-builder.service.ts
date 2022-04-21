import { Injectable } from '@angular/core';
import { AffectationModel } from 'src/app/shared/models/affectation.model';

@Injectable({
  providedIn: 'root'
})
export class AffectationBuilderService {

  constructor() { }

  buildAffectation(id:number,designation:string,description:string):AffectationModel{
    return new AffectationModel(id,designation,description)
  }

  buildAffectations(affectations:any):AffectationModel[] | undefined{
    if(!affectations) return undefined
    let result:AffectationModel[]=[]
    affectations.forEach((f:any)=> {
        const affectation=this.buildAffectation(f.id,f.designation,f.description)
        result.push(affectation)
    });
    return result
  }
}
