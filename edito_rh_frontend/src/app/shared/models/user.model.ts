

export interface User {
    email:string,
    firstName:string,
    lastName:string
}


export class UserModel implements User{

    private  _email=""
    private  _firstName=""
    private  _lastName=""

    constructor(email:string,firstName:string,lastName:string){
        this._email=email
        this._firstName=firstName
        this._lastName=lastName
    }

    get email() {
        return this._email;
    }
  
    /*set email(email:string) {
        this._email=email
    }*/

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }
}