
export interface Ville {
    id:number,
    nom:string,
    path:string
}


export class VilleModel implements Ville{

    private  _id
    private  _nom
    private _path

    constructor(id:number,nom:string,path:string){
        this._id=id
        this._nom=nom
        this._path=path    
    }

    get path() {
        return this._path;
    }

    get id() {
        return this._id;
    }

    get nom() {
        return this._nom;
    }

}