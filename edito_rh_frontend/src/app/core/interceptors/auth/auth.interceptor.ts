import { Injectable } from '@angular/core';

import { StorageService } from '../../services/storage/storage.service';
import { JwtHelperService } from '../../services/utils/jwtHelper/jwt-helper.service';
import { Store,select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Router } from '@angular/router';
import { AuthService } from '../../services/http/auth/auth.service';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import { throwError, Observable, BehaviorSubject, of, finalize,Subject } from "rxjs";
import { catchError, filter, take, switchMap,map } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing=false
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  getAccessToken$!:Observable<string>
  
  intercept(request: HttpRequest<any>, next: HttpHandler):  Observable<HttpEvent<Object>>{
    const access_token=this.storageService.getItem('access_token')
    const refresh_token=this.storageService.getItem('refresh_token')

    const access_token_payload=this.jwtHelper.decode(access_token)
    const refresh_token_payload=this.jwtHelper.decode(refresh_token)
    if(this.storageService.isLoggedIn()){
      if(Date.now()>Number(refresh_token_payload.exp)*1000){
        this.handleExpiredRefreshToken()
      }
      if (access_token !==null) {
        request = this.addAccessTokenToRequest(request,access_token)
      }

      return next.handle(request).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next,access_token,refresh_token);
        } else {
          return throwError(error);
        }
      }))as Observable<HttpEvent<any>>;
    }else{
      return next.handle(request)
    }
}

private handle401Error(request: HttpRequest<any>, next: HttpHandler,access_token:string,refresh_token:string) {
  if (!this.isRefreshing) {
    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);

    return this.authService.getNewAccessToken(access_token,refresh_token).pipe(
      switchMap((res: any) => {
        this.isRefreshing = false;
        this.refreshTokenSubject.next(res.token);
        this.storageService.setItem('access_token',res.token)
        return next.handle(this.addAccessTokenToRequest(request,res.token));
      }));

  } else {
    return this.refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(jwt => {
        return next.handle(this.addAccessTokenToRequest(request,jwt));
      }));
  }
}

  addAccessTokenToRequest(request:HttpRequest<unknown>,accessToken:string){
    return request.clone({
      headers:request.headers.set("Authorization",`Bearer ${accessToken}`)
    })
  }

  handleExpiredRefreshToken=()=>{
    this.storageService.clear()
    this.router.navigate(['/gestion'])
  }


  constructor(
    private storageService:StorageService,
    private jwtHelper:JwtHelperService,
    private store:Store<AppState>,
    private router:Router,
    private authService: AuthService,
    ) {}
}
