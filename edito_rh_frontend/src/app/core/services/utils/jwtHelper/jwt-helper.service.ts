import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { StorageService } from '../../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class JwtHelperService {

  
  decode=(token:string):any=>{
    try {
      return jwt_decode(<string>token);
    } catch(Error) {
      return null;
    }
  }

  constructor(private storageService:StorageService) { }
}
