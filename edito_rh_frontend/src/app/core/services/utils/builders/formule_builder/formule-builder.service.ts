import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Injectable } from '@angular/core';
import { FormuleModel } from 'src/app/shared/models/formule.model';
import { VariableModel } from 'src/app/shared/models/variable.model';
import { VariableBuilderService } from '../variable_builder/variable-builder.service';

@Injectable({
  providedIn: 'root'
})
export class FormuleBuilderService {


  buildFormule(id:number,designation:string,formule:string,path:string,variables:VariableModel[] | undefined=undefined):FormuleModel{
      return new FormuleModel(id,designation,formule,path,variables)
  }

  buildFormules(formules:any,is_one:boolean=false):FormuleModel[] | undefined{
    if(!formules) return undefined
    let result:FormuleModel[]=[]
    if(is_one){
        const variables=this.variableBuilder.buildVariables(formules.variables)
        return [this.buildFormule(formules.id,formules.designation,formules.formule,formules.path,variables)]
    }
    else{
      formules.forEach((f:any)=> {
        const formule=this.buildFormule(f.id,f.designation,f.formule,f.path)
        result.push(formule)
      });
      return result
    } 
  }
  constructor(private variableBuilder:VariableBuilderService) { }
}
