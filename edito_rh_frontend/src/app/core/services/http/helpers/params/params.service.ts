import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter, FilterMode, Page } from 'src/app/modules/gestions/state/gestion.state';
import { filter,map } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';
import {select, Store } from '@ngrx/store';
import { filtersSelector, pageSelector } from 'src/app/modules/gestions/state/gestion.selectors';
@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  filterModesOperators = new Map([
    [FilterMode.CONTIENT, 'icontains'],
    [FilterMode.EGAL,'eq'],
    [FilterMode.DIFFERENT, 'ne'],
    [FilterMode.SUPPERIEUR_STRICT,'gt'],
    [FilterMode.INFERIEUR_STRICT, 'lt'],
    [FilterMode.SUPPERIEUR,'gte'],
    [FilterMode.INFERIEUR,'lte'],
  ])
  constructor(private store:Store<AppState>) { }

  addFilterParams(params:HttpParams):HttpParams{
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
      let filterParams:string[]=[]
      filters.forEach((filter:Filter)=>{
        if(filter.filterMode!==FilterMode.COMPRIS_ENTRE){
          const operator=this.filterModesOperators.get(filter.filterMode)
          filterParams.push(`${operator}(${filter.field},${filter.value})`)
        }
        else{
          filterParams.push(`and(gte(${filter.field},${filter.gte}),lte(${filter.field},${filter.lte}))`)
        }
      });
      let filter=this.addAndOrOperators(filterParams)
      params=params.append('filter',filter)
      return params
  }

  private addAndOrOperators(filterParams:string[]):string{
    if(filterParams.length===1) return filterParams[0]
    let result=filterParams[0]
    filterParams.shift()
    filterParams.forEach((item:string)=>{
      result=`and(${result},${item})`
    })
    return result
  }

  addPageParams(params:HttpParams):HttpParams{
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
  let limit=100
  let offset=0
  if(limit && page.currentPage && page.maxRowsPerPage) {
    const maxRowsPerPage=page.maxRowsPerPage
    const currentPage=page.currentPage
    limit=maxRowsPerPage*currentPage
    offset=maxRowsPerPage*(currentPage-1)
  }
  params=params.append(`offset`,`${offset}`)
  params=params.append(`limit`,`${limit}`)

  return params
}

}
