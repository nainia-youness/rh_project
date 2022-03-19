import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }
  
  getAuthErrorMessage(error:any) {
    switch (error.statusText) {
      case 'Unknown Error':
        return 'Erreur inconnu';
      default:
        return error.error.message;
    }
  }
}
