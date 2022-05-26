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
    formules.forEach((f:any)=> {
      let variables:any
      if(is_one){
        if(f.variables.length!==0){
          if(f.variables[0].designation){
            variables=this.variableBuilder.buildVariables(f.variables)
          }
          else{
            variables=f.variables
          }
        }
        else variables=[]
      }
      const formule=this.buildFormule(f.id,f.designation,f.formule,f.path,variables)
      result.push(formule)
    });
    return result
  }
  constructor(private variableBuilder:VariableBuilderService) { }
}
