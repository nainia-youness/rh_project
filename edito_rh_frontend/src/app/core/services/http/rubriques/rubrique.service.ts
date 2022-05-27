import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import {select, Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { ParamsService } from '../helpers/params/params.service';
import { HelperService } from '../helpers/helper/helper.service';

@Injectable({
  providedIn: 'root'
})
export class RubriqueService {


  rubriques_url=`${environment.apiUrl}/rubriques`


  getRubriques():Observable<any>{
    
    let params = new HttpParams();
    params=this.paramsService.addFilterParams(params)
    params=this.paramsService.addPageParams(params)
    return this.http.get<any>(this.rubriques_url,{params})
  }
  
  getRubrique(action:any):Observable<any>{
    const id=this.helper.getId(action)
    return this.http.get<any>(`${this.rubriques_url}/${id}/`)
  }

  putRubrique(action:any):Observable<any>{
    const body=this.helper.removeUnderscores(action.rubrique)
    return this.http.put<any>(`${this.rubriques_url}/${action.id}/`,body)
  }

  postRubrique(action:any):Observable<any>{
    const body=this.helper.removeUnderscores(action.rubrique)
    return this.http.post<any>(`${this.rubriques_url}/`,body)
  }

  deleteRubrique(action:any):Observable<any>{
    return this.http.delete<any>(`${this.rubriques_url}/${action.id}`)
  }

  constructor(private http:HttpClient,private helper:HelperService,private paramsService:ParamsService){}
}