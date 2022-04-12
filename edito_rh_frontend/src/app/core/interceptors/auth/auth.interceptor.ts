import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../../services/storage/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storageService:StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(this.storageService.isLoggedIn()){
      const access_token=localStorage.getItem('access_token')?.slice(1,-1)
      const refresh_token=localStorage.getItem('refresh_token')?.slice(1,-1)
      const newReq=request.clone({
        headers:request.headers.set("Authorization",`Bearer ${access_token}`)
      })
      return next.handle(newReq);
    }
    return next.handle(request);
  }
}
