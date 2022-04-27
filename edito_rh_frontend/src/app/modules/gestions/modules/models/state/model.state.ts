import { FormuleModel } from "src/app/shared/models/formule.model";
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
    ville?:VilleModel,
    variable?:VariableModel,
    formule?:FormuleModel,
}

export const initialState: modelState={
    modelPageType:ModelPageType.LIST,
    modelPage:ModelPage.NO_PAGE,
    isModelProgressBar:false,
    error:undefined,
    ville:undefined,
    variable:undefined,
    formule:undefined,
}