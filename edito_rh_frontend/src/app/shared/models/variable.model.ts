
export interface Variable {
    id:number,
    designation:string,
    valeur:number
}


export class VariableModel implements Variable{

    private  _id
    private  _designation
    private  _valeur

    constructor(id:number,designation:string,valeur:number){
        this._id=id
        this._designation=designation
        this._valeur=valeur
    }

    get id() {
        return this._id;
    }

    get designation() {
        return this._designation;
    }

    get valeur(){
        return this._valeur;
    }
}