export interface Affectation {
    id:number,
    designation:string,
    description:string,
    path:string,
}


export class AffectationModel implements Affectation{

    private  _id
    private  _designation
    private  _description
    private _path

    constructor(id:number,designation:string,description:string,path:string){
        this._id=id
        this._designation=designation
        this._description=description
        this._path=path
    }

    get id() {
        return this._id;
    }

    get path() {
        return this._path;
    }

    get designation() {
        return this._designation;
    }

    get description(){
        return this._description;
    }
}