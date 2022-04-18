export interface Direction {
    id:number,
    designation:string,
    description:string
}


export class DirectionModel implements Direction{

    private  _id=0
    private  _designation=""
    private  _description=""

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