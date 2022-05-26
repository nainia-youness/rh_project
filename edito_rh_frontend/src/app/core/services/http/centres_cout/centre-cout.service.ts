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
export class CentreCoutService {

  centres_cout_url=`${environment.apiUrl}/centres-cout`

  getCentresCout():Observable<any>{
    
    let params = new HttpParams();
    params=this.paramsService.addFilterParams(params)
    params=this.paramsService.addPageParams(params)
    return this.http.get<any>(this.centres_cout_url,{params})
  }

  getCentreCout(action:any):Observable<any>{
    const id=this.helper.getId(action)
    return this.http.get<any>(`${this.centres_cout_url}/${id}/`)
  }

  putCentreCout(action:any):Observable<any>{
    const body=this.helper.removeUnderscores(action.centreCout)
    return this.http.put<any>(`${this.centres_cout_url}/${action.id}/`,body)
  }

  constructor(private http:HttpClient,private helper:HelperService,private paramsService:ParamsService){}
}
