export interface Affectation {
    id:number,
    designation:string,
    description:string
}


export class AffectationModel implements Affectation{

    private  _id
    private  _designation
    private  _description

    constructor(id:number,designation:string,description:string){
        this._id=id
        this._designation=designation
        this._description=description
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