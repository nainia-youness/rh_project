import { Variable } from "@angular/compiler/src/render3/r3_ast"
import { VariableModel } from "./variable.model"

export interface Formule {
    id:number,
    designation:string,
    formule:string,
    path:string,
    variables?:VariableModel[],
}


export class FormuleModel implements Formule{

    private  _id
    private  _designation
    private  _formule
    private _variables
    private _path

    constructor(id:number,designation:string,formule:string,path:string,variables:VariableModel[] | undefined=undefined){
        this._id=id
        this._designation=designation
        this._formule=formule
        this._variables=variables
        this._path=path
    }

    get id() {
        return this._id;
    }

    get path() {
        return this._path;
    }

    get variables() {
        return this._variables;
    }


    get designation() {
        return this._designation;
    }

    get formule(){
        return this._formule;
    }
}