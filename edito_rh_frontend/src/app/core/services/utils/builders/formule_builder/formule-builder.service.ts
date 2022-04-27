import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Injectable } from '@angular/core';
import { FormuleModel } from 'src/app/shared/models/formule.model';
import { VariableModel } from 'src/app/shared/models/variable.model';

@Injectable({
  providedIn: 'root'
})
export class FormuleBuilderService {

  constructor() { }

  buildFormule(id:number,designation:string,formule:string,variables:VariableModel[] | undefined=undefined):FormuleModel{
    if(variables===undefined){
      return new FormuleModel(id,designation,formule,undefined)
    }
    else{
      return new FormuleModel(id,designation,formule,variables)
    }
      
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
