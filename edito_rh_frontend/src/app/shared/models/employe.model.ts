import { AffectationModel } from "./affectation.model"
import { CentreCoutModel } from "./centre_cout.model"
import { ContratModel } from "./contrat.model"
import { DelegueModel } from "./delegue.model"
import { DirectionModel } from "./direction.model"
import { EntiteModel } from "./entite.model"
import { Fonction, FonctionModel } from "./fonction.model"
import { VilleModel } from "./ville.model"

export interface Employe {
    id:number,
    matricule:string,
    nom:string,
    prenom:string,
    date_naissance:Date,
    sexe:string,
    cin:string,
    date_entree:Date,
    situation_familiale:number,
    nombre_enfant:number,
    charge_familiale:number,
    adresse:string,
    nationalite:string,
    cnss:string,
    salaire:number,
    numero_compte:number,
    participation:number,
    date_sortie:Date,
    fonction:FonctionModel,
    centre_cout:CentreCoutModel,
    direction:DirectionModel,
    ville:VilleModel,
    contrat:ContratModel,
    affectation:AffectationModel,
    entite:EntiteModel,
    delegue:DelegueModel
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


    constructor(
        id:number,
        matricule:string,
        nom:string,
        prenom:string,
        date_naissance:Date,
        sexe:string,
        cin:string,
        date_entree:Date,
        situation_familiale:number,
        nombre_enfant:number,
        charge_familiale:number,
        adresse:string,
        nationalite:string,
        cnss:string,
        salaire:number,
        numero_compte:number,
        participation:number,
        date_sortie:Date,
        fonction:FonctionModel,
        centre_cout:CentreCoutModel,
        direction:DirectionModel,
        ville:VilleModel,
        contrat:ContratModel,
        affectation:AffectationModel,
        entite:EntiteModel,
        delegue:DelegueModel){
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
}