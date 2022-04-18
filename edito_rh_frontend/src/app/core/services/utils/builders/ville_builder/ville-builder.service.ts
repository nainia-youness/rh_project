import { Injectable } from '@angular/core';
import { VilleModel } from 'src/app/shared/models/ville.model';

@Injectable({
  providedIn: 'root'
})
export class VilleBuilderService {

  constructor() { }

  buildVille(id:number,nom:string):VilleModel{
    return new VilleModel(id,nom)
  }

  buildVilles(villes:any):VilleModel[] | undefined{
    if(!villes) return undefined
    let result:VilleModel[]=[]
    villes.forEach((f:any)=> {
        const ville=this.buildVille(f.id,f.nom)
        result.push(ville)
    });
    return result
  }
}
