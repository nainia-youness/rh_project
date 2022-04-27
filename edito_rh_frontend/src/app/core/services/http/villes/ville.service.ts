import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { ParamsService } from '../helpers/params/params.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  villes_url=`${environment.apiUrl}/villes`

  getVilles():Observable<any>{
    
    let params = new HttpParams();
    params=this.paramsService.addFilterParams(params)
    params=this.paramsService.addPageParams(params)
    return this.http.get<any>(this.villes_url,{params})
  }

  getVille(action:any):Observable<any>{
    const id=this.getId(action)
    return this.http.get<any>(`${this.villes_url}/${id}/`)
  }

  getId(action:any){
    let result=''
    for (const [key, value] of Object.entries(action)) {
      if(key!=='type')
        result+=value
    }
    return result
  }

  constructor(
    private http:HttpClient,private store:Store<AppState>,
    private paramsService:ParamsService,
    private actRoute: ActivatedRoute
    ){}
}
