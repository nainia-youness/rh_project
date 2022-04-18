import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { ParamsService } from '../helpers/params/params.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntiteService {

  
  entites_url=`${environment.apiUrl}/entites`

  getEntites():Observable<any>{
    
    let params = new HttpParams();
    params=this.paramsService.addFilterParams(params)
    params=this.paramsService.addPageParams(params)
    return this.http.get<any>(this.entites_url,{params})
  }

  constructor(private http:HttpClient,private store:Store<AppState>,private paramsService:ParamsService){}
}
