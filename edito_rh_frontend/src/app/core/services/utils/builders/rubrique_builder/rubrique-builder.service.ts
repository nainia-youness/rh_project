import { Injectable } from '@angular/core';
import { RubriqueModel } from 'src/app/shared/models/rubrique.model';

@Injectable({
  providedIn: 'root'
})
export class RubriqueBuilderService {

  constructor() { }

  buildRubrique(id:number,designation:string,description:string,path:string,montant:number | undefined=undefined):RubriqueModel{
    return new RubriqueModel(id,designation,description,path,montant)
  }

  buildRubriques(rubriques:any):RubriqueModel[] | undefined{
    if(!rubriques) return undefined
    let result:RubriqueModel[]=[]
    rubriques.forEach((f:any)=> {
        const rubrique=this.buildRubrique(f.id,f.designation,f.description,f.path,f.montant)
        result.push(rubrique)
    });
    return result
  }
}
