import { Injectable } from '@angular/core';
import { CentreCoutModel } from 'src/app/shared/models/centre_cout.model';

@Injectable({
  providedIn: 'root'
})
export class CentreCoutBuilderService {

  constructor() { }

  buildCentreCout(id:number,label:string,description:string):CentreCoutModel{
    return new CentreCoutModel(id,label,description)
  }

  buildCentresCout(centresCout:any):CentreCoutModel[] | undefined{
    if(!centresCout) return undefined
    let result:CentreCoutModel[]=[]
    centresCout.forEach((f:any)=> {
        const centreCout=this.buildCentreCout(f.id,f.designation,f.description)
        result.push(centreCout)
    });
    return result
  }
}
