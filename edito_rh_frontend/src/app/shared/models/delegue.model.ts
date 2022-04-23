export interface Delegue {
    id:number,
    nom:string,
    prenom:string,
    matricule:string
}


export class DelegueModel implements Delegue{

    private  _id
    private _nom
    private _prenom
    private _matricule

    constructor(id:number,matricule:string,nom:string,prenom:string){
        this._id=id
        this._nom=nom
        this._prenom=prenom
        this._matricule=matricule
    }

    get id() {
        return this._id;
    }

    get nom() {
        return this._nom;
    }

    get prenom(){
        return this._prenom;
    }

    get matricule(){
        return this._matricule;
    }
}