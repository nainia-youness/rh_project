import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FonctionModel } from 'src/app/shared/models/fonction.model';
import { filter,map } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';
import {select, Store } from '@ngrx/store';
import { filtersSelector } from 'src/app/modules/gestions/state/gestion.selectors';
import { Filter } from 'src/app/modules/gestions/state/gestion.state';

@Injectable({
  providedIn: 'root'
})
export class FonctionService {


  fonctions_url='http://localhost:3000/fonctions'


  getFonctions():Observable<any>{
    
    let params = new HttpParams();

    this.store.pipe(
      select(filtersSelector),
      filter( val => val.length!==0),
      map((filters)=> {
        params=this.addFilterParams(params,filters)
        return filters
      })
    ).subscribe()
    
    return this.http.get<any>(this.fonctions_url,{params})
  }

  
  private addFilterParams(params:HttpParams,filters:Filter[]):HttpParams{

      filters.forEach((filter:Filter)=>{
        if(filter.value){//equal
          params=params.append(`${filter.field}[eq]`,`${filter.value.toString()}`)
        }
        else if(filter.gte && filter.lte){
          params=params.append(`${filter.field}[gte]`,`${filter.gte.toString()}`)
          params=params.append(`${filter.field}[lte]`,`${filter.lte.toString()}`)
        }
      });
      return params
  }

  /*private filtersForSameField(filters:Filter[]){
    let result:Array<Array<Filter>>=[]
    filters.forEach((filter1:Filter)=>{
      let filterForOneField:Filter[]=[]
      filters.forEach((filter2:Filter)=>{
        if(filter1.field===filter2.field){
          filterForOneField.push(filter1)
        }
      });
      if(filterForOneField.length!==1) result.push(filterForOneField)
    });
    return result
  }*/



  constructor(private http:HttpClient,private store:Store<AppState>){}
}