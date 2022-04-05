import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from './auth.interface';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient){}
  
  auth_post_url=`${environment.apiUrl}/users`


  login(email:string,password:string):Observable<AuthResponse>{
      return this.http.post<AuthResponse>(this.auth_post_url,{email,password})
              .pipe(
                //tap(data => console.log(data)),
                //catchError(this.handleError)
              )
  }
}