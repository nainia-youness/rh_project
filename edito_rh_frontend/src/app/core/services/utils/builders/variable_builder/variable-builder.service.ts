import { Injectable } from '@angular/core';
import { VariableModel } from 'src/app/shared/models/variable.model';

@Injectable({
  providedIn: 'root'
})
export class VariableBuilderService {

  constructor() { }

  buildVariable(id:number,designation:string,valeur:number):VariableModel{
    return new VariableModel(id,designation,valeur)
  }

  buildVariables(variables:any):VariableModel[] | undefined{
    if(!variables) return undefined
    let result:VariableModel[]=[]
    variables.forEach((f:any)=> {
        const variable=this.buildVariable(f.id,f.designation,f.valeur)
        result.push(variable)
    });
    return result
  }

}

