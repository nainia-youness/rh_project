
export interface Fonction {
    id:number,
    label:string,
    description:string
}


export class FonctionModel implements Fonction{

    private  _id=0
    private  _label=""
    private  _description=""

    constructor(id:number,label:string,description:string){
        this._id=id
        this._label=label
        this._description=description
    }

    get id() {
        return this._id;
    }

    get label() {
        return this._label;
    }

    get description(){
        return this._description;
    }
}