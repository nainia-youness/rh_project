import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../../services/storage/storage.service';
import { JwtHelperService } from '../../services/utils/jwtHelper/jwt-helper.service';
import { Store,select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getAccessTokenStart } from 'src/app/modules/auth/state/auth.actions';
import { filter,map } from 'rxjs/operators';
import { getAccessTokenSuccessSelector } from 'src/app/modules/auth/state/auth.selector';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  getAccessToken$!:Observable<string>

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(this.storageService.isLoggedIn()){
      const access_token=this.storageService.getItem('access_token')
      const refresh_token=this.storageService.getItem('refresh_token')

      let access_token_payload=this.jwtHelper.decode(access_token)
      let refresh_token_payload=this.jwtHelper.decode(refresh_token)

      if(Date.now()>Number(refresh_token_payload.exp)*1000){//if the refresh token is expired
        this.storageService.clear()
        this.router.navigate(['/gestion'])
      }

      if(Date.now()<Number(access_token_payload.exp)*1000){//if the access the token is valid
        const newReq=request.clone({
          headers:request.headers.set("Authorization",`Bearer ${access_token}`)
        })
        return next.handle(newReq);
      }
      else{//if the access the token is expired
        this.store.dispatch(getAccessTokenStart({access_token,refresh_token}))
        this.getAccessToken$
        this.store.pipe(
          select(getAccessTokenSuccessSelector),
          filter( val=> val !== undefined),
          map((accessToken)=>{
            const newReq=request.clone({
              headers:request.headers.set("Authorization",`Bearer ${accessToken}`)
            })
            return next.handle(newReq);
          }))
      }
    }
    return next.handle(request);
  }

  constructor(
    private storageService:StorageService,
    private jwtHelper:JwtHelperService,
    private store:Store<AppState>,
    private router:Router,
    ) {}
}
