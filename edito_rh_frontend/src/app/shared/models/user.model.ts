

export interface User {
    email:string,
    nom:string,
    prenom:string,
    id:number,
}


export class UserModel implements User{

    private  _email=""
    private  _prenom=""
    private  _nom=""
    private  _id=0

    constructor(email:string,nom:string,prenom:string,id:number){
        this._email=email
        this._nom=nom
        this._prenom=prenom
        this._id=id
    }

    get email() {
        return this._email;
    }
  
    /*set email(email:string) {
        this._email=email
    }*/

    get nom() {
        return this._nom;
    }

    get prenom() {
        return this._prenom;
    }

    get id() {
        return this._id;
    }
}