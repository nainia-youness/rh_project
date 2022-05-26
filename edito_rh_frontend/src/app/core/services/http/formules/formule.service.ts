import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ParamsService } from '../helpers/params/params.service';
import { HelperService } from '../helpers/helper/helper.service';

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
    const id=this.helper.getId(action)
    return this.http.get<any>(`${this.formules_url}/${id}/`)
  }

  putFormule(action:any):Observable<any>{
    const body=this.helper.removeUnderscores(action.formule)
    return this.http.put<any>(`${this.formules_url}/${action.id}/`,body)
  }

  putFormuleVariable(action:any):Observable<any>{
    const variableId:String=action.variableId
    const formuleId:String=action.formuleId
    const body={}
    return this.http.put<any>(`${this.formules_url}/${formuleId}/variables/${variableId}`,body)
  }

  deleteFormuleVariable(action:any):Observable<any>{
    const variableId:String=action.variableId
    const formuleId:String=action.formuleId
    return this.http.delete<any>(`${this.formules_url}/${formuleId}/variables/${variableId}`)
  }

  constructor(private http:HttpClient,private helper:HelperService,private paramsService:ParamsService){}
}