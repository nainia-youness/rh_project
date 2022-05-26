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
export class FonctionService {


  fonctions_url=`${environment.apiUrl}/fonctions`


  getFonctions():Observable<any>{
    
    let params = new HttpParams();
    params=this.paramsService.addFilterParams(params)
    params=this.paramsService.addPageParams(params)
    return this.http.get<any>(this.fonctions_url,{params})
  }
  
  getFonction(action:any):Observable<any>{
    const id=this.helper.getId(action)
    return this.http.get<any>(`${this.fonctions_url}/${id}/`)
  }

  putFonction(action:any):Observable<any>{
    const body=this.helper.removeUnderscores(action.fonction)
    return this.http.put<any>(`${this.fonctions_url}/${action.id}/`,body)
  }

  constructor(private http:HttpClient,private helper:HelperService,private paramsService:ParamsService){}
}