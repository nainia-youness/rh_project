import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storageService:StorageService,private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    const routeUserWantsToGoTo=state.url
    if(this.storageService.isLoggedIn()){

      if(routeUserWantsToGoTo==='/login') return false
      return true

    }
    else{//user not logged in

      if(routeUserWantsToGoTo ==='/login') return true
      this.router.navigate(['/login'])
      return false

    }
  }
}
