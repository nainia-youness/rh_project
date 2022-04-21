import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { environment } from 'src/environments/environment';
import { ParamsService } from '../helpers/params/params.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  
  employes_url=`${environment.apiUrl}/employes`

  getEmployes():Observable<any>{
    let params = new HttpParams();
    params=this.paramsService.addFilterParams(params)
    params=this.paramsService.addPageParams(params)
    return this.http.get<any>(this.employes_url,{params})
  }

  constructor(private http:HttpClient,private store:Store<AppState>,private paramsService:ParamsService){}
}
