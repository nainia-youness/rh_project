import { Injectable } from '@angular/core';
import { VariableModel } from 'src/app/shared/models/variable.model';

@Injectable({
  providedIn: 'root'
})
export class VariableBuilderService {

  constructor() { }

  buildVariable(id:number,designation:string,valeur:number,path:string):VariableModel{
    return new VariableModel(id,designation,valeur,path)
  }

  buildVariables(variables:any):VariableModel[] | undefined{
    if(!variables) return undefined
    let result:VariableModel[]=[]
    variables.forEach((f:any)=> {
        const variable=this.buildVariable(f.id,f.designation,f.valeur,f.path)
        result.push(variable)
    });
    return result
  }

}

