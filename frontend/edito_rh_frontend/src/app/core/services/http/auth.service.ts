import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthResponse } from './auth.interface';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient){}
  auth_post_url='http://localhost:3000/users'


  login(email:string,password:string):Observable<AuthResponse>{
      return this.http.post<AuthResponse>(this.auth_post_url,{email,password})
              .pipe(
                //tap(data => console.log(data)),
                //catchError(this.handleError)
              )
  }

  handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console

    throw err
    let errorMessage: string;
    
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    console.error(err);
    return throwError(errorMessage);
  }
  /*formatUser(data:AuthResponseData){
      const user=new User(data.email)
      return user
  }*/
}
