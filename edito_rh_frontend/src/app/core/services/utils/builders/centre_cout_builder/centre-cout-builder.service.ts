import { Injectable } from '@angular/core';
import { CentreCoutModel } from 'src/app/shared/models/centre_cout.model';

@Injectable({
  providedIn: 'root'
})
export class CentreCoutBuilderService {

  constructor() { }

  buildCentreCout(id:number,label:string,description:string,path:string):CentreCoutModel{
    return new CentreCoutModel(id,label,description,path)
  }

  buildCentresCout(centresCout:any):CentreCoutModel[] | undefined{
    if(!centresCout) return undefined
    let result:CentreCoutModel[]=[]
    centresCout.forEach((f:any)=> {
        const centreCout=this.buildCentreCout(f.id,f.designation,f.description,f.path)
        result.push(centreCout)
    });
    return result
  }
}
