import { Injectable } from '@angular/core';
import { DirectionModel } from 'src/app/shared/models/direction.model';

@Injectable({
  providedIn: 'root'
})
export class DirectionBuilderService {

  constructor() { }

  buildDirection(id:number,label:string,description:string):DirectionModel{
    return new DirectionModel(id,label,description)
  }

  buildDirections(directions:any):DirectionModel[] | undefined{
    if(!directions) return undefined
    let result:DirectionModel[]=[]
    directions.forEach((f:any)=> {
        const direction=this.buildDirection(f.id,f.designation,f.description)
        result.push(direction);
    })
    return result
  }
}
