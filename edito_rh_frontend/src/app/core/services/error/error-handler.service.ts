import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  
  handleError(error:any) {
    if(error.statusText==='Unknown Error') return 'Erreur inconnu'
    if(error.status===404){
      this.router.navigate(['/page404'])
    }
    return error.statusText;
  }

  constructor(
    private router:Router,
  ) { }
}
