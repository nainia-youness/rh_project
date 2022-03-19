import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user.model';
import { AuthResponse } from '../http/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class UserBuilderService {

  constructor() { }

  fromParsedData(parsedData:any){
    const email=parsedData._email
    const firstName=parsedData._firstName
    const lastName=parsedData._lastName
    const user=new UserModel(email,firstName,lastName)
    return user
  }

  fromAuthResponse(authResponse:AuthResponse){
    const email=authResponse.email
    const firstName=authResponse.firstName
    const lastName=authResponse.lastName
    const user=new UserModel(email,firstName,lastName)
    return user
  }
}
