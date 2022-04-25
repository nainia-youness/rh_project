
export interface Formule {
    id:number,
    designation:string,
    formule:string
}


export class FormuleModel implements Formule{

    private  _id
    private  _designation
    private  _formule

    constructor(id:number,designation:string,formule:string){
        this._id=id
        this._designation=designation
        this._formule=formule
    }

    get id() {
        return this._id;
    }

    get designation() {
        return this._designation;
    }

    get formule(){
        return this._formule;
    }
}