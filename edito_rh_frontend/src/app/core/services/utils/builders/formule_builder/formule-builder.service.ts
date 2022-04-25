import { Injectable } from '@angular/core';
import { FormuleModel } from 'src/app/shared/models/formule.model';

@Injectable({
  providedIn: 'root'
})
export class FormuleBuilderService {

  constructor() { }

  buildFormule(id:number,designation:string,formule:string):FormuleModel{
    return new FormuleModel(id,designation,formule)
  }

  buildFormules(formules:any):FormuleModel[] | undefined{
    if(!formules) return undefined
    let result:FormuleModel[]=[]
    formules.forEach((f:any)=> {
        const formule=this.buildFormule(f.id,f.designation,f.formule)
        result.push(formule)
    });
    return result
  }

}
