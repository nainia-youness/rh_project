import { Injectable } from '@angular/core';
import { FonctionModel } from 'src/app/shared/models/fonction.model';

@Injectable({
  providedIn: 'root'
})
export class FonctionBuilderService {

  constructor() { }

  buildFonction(id:number,label:string,description:string):FonctionModel{
    return new FonctionModel(id,label,description)
  }

  buildFonctions(fonctions:any):FonctionModel[] | undefined{
    if(!fonctions) return undefined
    let result:FonctionModel[]=[]
    fonctions.forEach((f:any)=> {
        const fonction=this.buildFonction(f.id,f.designation,f.description)
        result.push(fonction)
    });
    return result
  }

}
