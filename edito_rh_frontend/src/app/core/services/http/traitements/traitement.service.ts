import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HelperService } from '../helpers/helper/helper.service';
import { ParamsService } from '../helpers/params/params.service';

@Injectable({
  providedIn: 'root'
})
export class TraitementService {

 
  traitements_url=`${environment.apiUrl}/traitements`

  getTraitements():Observable<any>{
    let params = new HttpParams();
    params=this.paramsService.addFilterParams(params)
    params=this.paramsService.addPageParams(params)
    return this.http.get<any>(this.traitements_url,{params})
  }
  
  constructor(private http:HttpClient,private helper:HelperService,private paramsService:ParamsService){}
}
