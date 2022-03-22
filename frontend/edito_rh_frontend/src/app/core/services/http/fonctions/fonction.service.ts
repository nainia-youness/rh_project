import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FonctionModel } from 'src/app/shared/models/fonction.model';

@Injectable({
  providedIn: 'root'
})
export class FonctionService {

  constructor(private http:HttpClient){}
  fonctions_url='http://localhost:3000/fonctions'


  getFonctions():Observable<any>{
      return this.http.get<any>(this.fonctions_url)
  }

}