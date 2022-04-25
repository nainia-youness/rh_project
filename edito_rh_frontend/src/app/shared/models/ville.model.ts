
export interface Ville {
    id:number,
    nom:string,
}


export class VilleModel implements Ville{

    private  _id
    private  _nom

    constructor(id:number,nom:string){
        this._id=id
        this._nom=nom    
    }

    get id() {
        return this._id;
    }

    get nom() {
        return this._nom;
    }

}