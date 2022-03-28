import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FonctionModel } from 'src/app/shared/models/fonction.model';
import { filter,map } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';
import {select, Store } from '@ngrx/store';
import { filtersSelector, pageSelector } from 'src/app/modules/gestions/state/gestion.selectors';
import { Filter, Page } from 'src/app/modules/gestions/state/gestion.state';

@Injectable({
  providedIn: 'root'
})
export class FonctionService {


  fonctions_url='http://localhost:3000/fonctions'


  getFonctions():Observable<any>{
    
    let params = new HttpParams();

    params=this.addFilterParams(params)
    params=this.addPageParams(params)
    return this.http.get<any>(this.fonctions_url,{params})
  }

  
  private addFilterParams(params:HttpParams):HttpParams{
    this.store.pipe(
      select(filtersSelector),
      filter( val => val.length!==0),
      map((filters)=> {
        params=this.filterParams(params,filters)
        return filters
      })
    ).subscribe()
    return params
  }

  private filterParams(params:HttpParams,filters:Filter[]):HttpParams{

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

  private addPageParams(params:HttpParams):HttpParams{
    this.store.pipe(
      select(pageSelector),
      map((page:Page)=> {
        params=this.pageParams(params,page)
        return page
      })
    ).subscribe()
    return params
}
private pageParams(params:HttpParams,page:Page):HttpParams{
  const limit=page.rowsPerPage
  let offset=0
  if(limit && page.currentPage) offset=limit*(page.currentPage-1)
  params=params.append(`offset`,`${offset}`)
  params=params.append(`limit`,`${limit}`)

  return params
}


  constructor(private http:HttpClient,private store:Store<AppState>){}
}