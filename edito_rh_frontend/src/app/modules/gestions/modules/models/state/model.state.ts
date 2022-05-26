import { AffectationModel } from "src/app/shared/models/affectation.model";
import { CentreCoutModel } from "src/app/shared/models/centre_cout.model";
import { ContratModel } from "src/app/shared/models/contrat.model";
import { DirectionModel } from "src/app/shared/models/direction.model";
import { EmployeModel } from "src/app/shared/models/employe.model";
import { EntiteModel } from "src/app/shared/models/entite.model";
import { FonctionModel } from "src/app/shared/models/fonction.model";
import { FormuleModel } from "src/app/shared/models/formule.model";
import { RubriqueModel } from "src/app/shared/models/rubrique.model";
import { VariableModel } from "src/app/shared/models/variable.model";
import { VilleModel } from "src/app/shared/models/ville.model";



export enum ModelPageType{
    CREER='creer',
    MODIFIER='modifier',
    LIST='list'
}

export enum ModelPage {
    NO_PAGE="",
    FONCTION = "Fonction",
    VILLE = "Ville",
    ENTITE = "Entité",
    DIRECTION = "Direction",
    CONTRAT = "Contrat",
    CENTRE_COUT = "Centre Cout",
    AFFECTATION = "Affectation",
    EMPLOYE = "Employé",
    RUBRIQUE = "Rubrique",
    FORMULE = "Formule",
    VARIABLE = "Variable",
}


export interface modelState {
    modelPageType:ModelPageType,
    modelPage:ModelPage,
    isModelProgressBar:boolean,
    error?:string,
    putError?:string,
    postError?:string,
    ville?:VilleModel,
    variable?:VariableModel,
    formule?:FormuleModel,
    affectation?:AffectationModel,
    centreCout?:CentreCoutModel,
    contrat?:ContratModel,
    direction?:DirectionModel,
    entite?:EntiteModel,
    fonction?:FonctionModel,
    rubrique?:RubriqueModel,
    employe?:EmployeModel,
}

export const initialState: modelState={
    modelPageType:ModelPageType.LIST,
    modelPage:ModelPage.NO_PAGE,
    isModelProgressBar:false,
    error:undefined,
    putError:undefined,
    postError:undefined,
    ville:undefined,
    variable:undefined,
    formule:undefined,
    affectation:undefined,
    centreCout:undefined,
    contrat:undefined,
    direction:undefined,
    entite:undefined,
    fonction:undefined,
    rubrique:undefined,
    employe:undefined,
}