
export interface Rubrique {
    id:number,
    designation:string,
    description:string,
    path:string,
    montant?:number,
}


export class RubriqueModel implements Rubrique{

    private  _id
    private  _designation
    private  _description
    private _path
    private _montant

    constructor(id:number,designation:string,description:string,path:string,montant:number | undefined=undefined){
        this._id=id
        this._designation=designation
        this._description=description
        this._path=path
        this._montant=montant
    }

    get montant() {
        return this._montant;
    }

    set montant(montant:number | undefined) {
        this._montant=montant;
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

    get description(){
        return this._description;
    }
}