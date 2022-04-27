import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import {select, Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { ParamsService } from '../helpers/params/params.service';

@Injectable({
  providedIn: 'root'
})
export class FormuleService {


  formules_url=`${environment.apiUrl}/formules`


  getFormules():Observable<any>{
    
    let params = new HttpParams();
    params=this.paramsService.addFilterParams(params)
    params=this.paramsService.addPageParams(params)
    return this.http.get<any>(this.formules_url,{params})
  }

  getFormule(action:any):Observable<any>{
    const id=this.getId(action)
    return this.http.get<any>(`${this.formules_url}/${id}/`)
  }

  getId(action:any){
    let result=''
    for (const [key, value] of Object.entries(action)) {
      if(key!=='type')
        result+=value
    }
    return result
  }
  constructor(private http:HttpClient,private store:Store<AppState>,private paramsService:ParamsService){}
}