import { RubriqueService } from "src/app/core/services/http/rubriques/rubrique.service"
import { AffectationModel } from "./affectation.model"
import { CentreCoutModel } from "./centre_cout.model"
import { ContratModel } from "./contrat.model"
import { DelegueModel } from "./delegue.model"
import { DirectionModel } from "./direction.model"
import { EntiteModel } from "./entite.model"
import { Fonction, FonctionModel } from "./fonction.model"
import { RubriqueModel } from "./rubrique.model"
import { VilleModel } from "./ville.model"

export interface Employe {
    id:number,
    matricule?:string,
    nom?:string,
    prenom?:string,
    date_naissance?:Date,
    sexe?:string,
    cin?:string,
    date_entree?:Date,
    situation_familiale?:number,
    nombre_enfant?:number,
    charge_familiale?:number,
    adresse?:string,
    nationalite?:string,
    cnss?:string,
    salaire?:number,
    numero_compte?:number,
    participation?:number,
    date_sortie?:Date,
    fonction?:FonctionModel | number,
    centre_cout?:CentreCoutModel | number,
    direction?:DirectionModel | number,
    ville?:VilleModel | number,
    contrat?:ContratModel | number,
    affectation?:AffectationModel | number,
    entite?:EntiteModel | number,
    delegue?:DelegueModel | number
    rubriques?:RubriqueModel[] | number[],
    path:string,
}


export class EmployeModel implements Employe{

    private _id
    private _matricule
    private _nom
    private _prenom
    private _date_naissance
    private _sexe
    private _cin
    private _date_entree
    private _situation_familiale
    private _nombre_enfant
    private _charge_familiale
    private _adresse
    private _nationalite
    private _cnss
    private _salaire
    private _numero_compte
    private _participation
    private _date_sortie
    private _fonction
    private _centre_cout
    private _direction
    private _ville
    private _contrat
    private _affectation
    private _entite
    private _delegue
    private _rubriques
    private _path

    constructor(
        id:number,
        matricule:string | undefined=undefined,
        nom:string | undefined=undefined,
        prenom:string | undefined=undefined,
        date_naissance:Date | undefined=undefined,
        sexe:string | undefined=undefined,
        cin:string | undefined=undefined,
        date_entree:Date | undefined=undefined,
        situation_familiale:number | undefined=undefined,
        nombre_enfant:number | undefined=undefined,
        charge_familiale:number | undefined=undefined,
        adresse:string | undefined=undefined,
        nationalite:string | undefined=undefined,
        cnss:string | undefined=undefined,
        salaire:number | undefined=undefined,
        numero_compte:number | undefined=undefined,
        participation:number | undefined=undefined,
        date_sortie:Date | undefined=undefined,
        fonction:FonctionModel | undefined=undefined,
        centre_cout:CentreCoutModel | undefined=undefined,
        direction:DirectionModel | undefined=undefined,
        ville:VilleModel | undefined=undefined,
        contrat:ContratModel | undefined=undefined,
        affectation:AffectationModel | undefined=undefined,
        entite:EntiteModel | undefined=undefined,
        path:string,
        delegue:DelegueModel | undefined=undefined,
        rubriques:RubriqueModel[] | undefined=undefined,
        ){
        this._id=id
        this._matricule=matricule
        this._nom=nom
        this._prenom=prenom
        this._date_naissance=date_naissance
        this._sexe=sexe
        this._cin=cin
        this._date_entree=date_entree
        this._situation_familiale=situation_familiale
        this._nombre_enfant=nombre_enfant
        this._charge_familiale=charge_familiale
        this._adresse=adresse
        this._nationalite=nationalite
        this._cnss=cnss
        this._salaire=salaire
        this._numero_compte=numero_compte
        this._participation=participation
        this._date_sortie=date_sortie
        this._fonction=fonction
        this._centre_cout=centre_cout
        this._direction=direction
        this._ville=ville
        this._contrat=contrat
        this._affectation=affectation
        this._entite=entite
        this._delegue=delegue
        this._rubriques=rubriques
        this._path=path
    }

    get path() {
        return this._path;
    }

    get rubriques() {
        return this._rubriques;
    }

    set rubriques(rubriques:RubriqueModel[] | undefined) {
        this._rubriques=rubriques;
    }

    get id() {
        return this._id;
    }

    get matricule() {
        return this._matricule;
    }
    get nom() {
        return this._nom;
    }

    get prenom() {
        return this._prenom;
    }

    get date_naissance() {
        return this._date_naissance;

    }    

    get sexe() {
        return this._sexe;
    }

    get cin() {
        return this._cin;
    }

    get date_entree() {
        return this._date_entree;
    }    
    
    get situation_familiale() {
        return this._situation_familiale;
    }

    get nombre_enfant() {
        return this._nombre_enfant;
    }    
    
    get charge_familiale() {
        return this._charge_familiale;
    }

    get adresse() {
        return this._adresse;
    }    
    
    get nationalite() {
        return this._nationalite;
    }

    get cnss() {
        return this._cnss;
    }    
    
    get salaire() {
        return this._salaire;
    }

    get numero_compte() {
        return this._numero_compte;
    }    
    
    get participation() {
        return this._participation;
    }

    get date_sortie() {
        return this._date_sortie;
    }

    get fonction() {
        return this._fonction;
    }

    get centre_cout() {
        return this._centre_cout;
    }    

    get direction() {
        return this._direction;
    }    
    
    get ville() {
        return this._ville;
    }

    get contrat() {
        return this._contrat;
    }
    
    get affectation() {
        return this._affectation;
    }

    get entite() {
        return this._entite;
    }   

    get delegue() {
        return this._delegue;
    }

    set delegue(delegue:DelegueModel | undefined) {
        this._delegue=delegue;
    }
}