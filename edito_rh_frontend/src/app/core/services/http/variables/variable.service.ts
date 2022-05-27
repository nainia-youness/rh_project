import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ParamsService } from '../helpers/params/params.service';
import { HelperService } from '../helpers/helper/helper.service';

@Injectable({
  providedIn: 'root'
})
export class VariableService {


  variables_url=`${environment.apiUrl}/variables`


  getVariables():Observable<any>{
    
    let params = new HttpParams();
    params=this.paramsService.addFilterParams(params)
    params=this.paramsService.addPageParams(params)
    return this.http.get<any>(this.variables_url,{params})
  }
  
  getVariable(action:any):Observable<any>{
    const id=this.helper.getId(action)
    return this.http.get<any>(`${this.variables_url}/${id}/`)
  }

  putVariable(action:any):Observable<any>{
    const body=this.helper.removeUnderscores(action.variable)
    return this.http.put<any>(`${this.variables_url}/${action.id}/`,body)
  }
  
  postVariable(action:any):Observable<any>{
    const body=this.helper.removeUnderscores(action.variable)
    return this.http.post<any>(`${this.variables_url}/`,body)
  }

  deleteVariable(action:any):Observable<any>{
    return this.http.delete<any>(`${this.variables_url}/${action.id}`)
  }

  constructor(private http:HttpClient,private helper:HelperService,private paramsService:ParamsService){}
}