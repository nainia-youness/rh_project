
export interface Variable {
    id:number,
    designation:string,
    valeur:number,
    path:string
}


export class VariableModel implements Variable{

    private  _id
    private  _designation
    private  _valeur
    private _path

    constructor(id:number,designation:string,valeur:number,path:string){
        this._id=id
        this._designation=designation
        this._valeur=valeur
        this._path=path
    }

    get path() {
        return this._path;
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