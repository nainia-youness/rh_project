import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserBuilderService {

  constructor() { }

  fromParsedData(parsedData:any){
    const email=parsedData._email
    const nom=parsedData._nom
    const prenom=parsedData._prenom
    const id=parsedData._id
    const user=new UserModel(email,nom,prenom,id)
    return user
  }

  fromResponse(response:any){
    console.log(response)
    const email=response.email
    const id=response.id
    const nom=response.nom
    const prenom=response.prenom
    const user=new UserModel(email,nom,prenom,id)
    return user
  }
}
