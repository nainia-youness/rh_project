
export interface Traitement {
    id:number,
    is_cloture:boolean,
    date_derniere_operation:Date
}


export class TraitementModel implements Traitement{

    private  _id
    private  _is_cloture
    private  _date_derniere_operation

    constructor(id:number,is_cloture:boolean,date_derniere_operation:Date){
        this._id=id
        this._is_cloture=is_cloture
        this._date_derniere_operation=date_derniere_operation
    }

    get is_cloture() {
        return this._is_cloture;
    }

    get date_derniere_operation() {
        return this._date_derniere_operation;
    }

    get id() {
        return this._id;
    }
}