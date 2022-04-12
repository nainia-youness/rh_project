import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient){}
  
  auth_url=`${environment.apiUrl}/auth`


  login(email:string,password:string):Observable<any>{
      return this.http.post<any>(this.auth_url+'/login/',{email,password},{withCredentials:true,observe: "response"})
              /*.pipe(
                //tap(data => console.log(data.headers)),
                //catchError(this.handleError)
              )*/
  }

  register(email:string,password:string,nom:string,prenom:string):Observable<any>{
    return this.http.post<any>(this.auth_url+'/register/',{email,password,nom,prenom},{withCredentials:true})
  }


  getUser():Observable<any>{
    return this.http.get<any>(this.auth_url+'/user/')
  }
}