import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { ParamsService } from '../helpers/params/params.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HelperService } from '../helpers/helper/helper.service';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  contrats_url=`${environment.apiUrl}/contrats`

  getContrats():Observable<any>{
    
    let params = new HttpParams();
    params=this.paramsService.addFilterParams(params)
    params=this.paramsService.addPageParams(params)
    return this.http.get<any>(this.contrats_url,{params})
  }

  getContrat(action:any):Observable<any>{
    const id=this.helper.getId(action)
    return this.http.get<any>(`${this.contrats_url}/${id}/`)
  }

  putContrat(action:any):Observable<any>{
    const body=this.helper.removeUnderscores(action.contrat)
    return this.http.put<any>(`${this.contrats_url}/${action.id}/`,body)
  }

  postContrat(action:any):Observable<any>{
    const body=this.helper.removeUnderscores(action.contrat)
    return this.http.post<any>(`${this.contrats_url}/`,body)
  }

  deleteContrat(action:any):Observable<any>{
    return this.http.delete<any>(`${this.contrats_url}/${action.id}`)
  }

  constructor(private http:HttpClient,private helper:HelperService,private paramsService:ParamsService){}
}
