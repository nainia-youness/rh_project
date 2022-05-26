import { createAction,props } from "@ngrx/store";
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
import { ModelPage, ModelPageType } from "./model.state";


enum ActionTypes {
    MODEL_PAGE_CHANGE = '[Model Page] Model Page change',
    IS_MODEL_PROGRESS_BAR = '[Model Page] Is Model Progress Bar change',
    MODEL_PAGE_TYPE_CHANGE = '[Model Type Page] Model Page Type change',

    GET_MODEL_FAILURE = '[Model Page] Get Model Failure',
    PUT_MODEL_FAILURE = '[Model Page] Put Model Failure',


    GET_VILLE_START = '[Ville Page] Get Ville Start',
    GET_VILLE_SUCCESS = '[Ville Page] Get Ville Success',
    GET_VARIABLE_START = '[Variable Page] Get Variable Start',
    GET_VARIABLE_SUCCESS = '[Variable Page] Get Variable Success',
    GET_FORMULE_START = '[Formule Page] Get Formule Start',
    GET_FORMULE_SUCCESS = '[Formule Page] Get Formule Success',
    GET_AFFECTATION_START = '[Affectation Page] Get Affectation Start',
    GET_AFFECTATION_SUCCESS = '[Affectation Page] Get Affectation Success',
    GET_CENTRE_COUT_START = '[Centre Cout Page] Get Centre Cout Start',
    GET_CENTRE_COUT_SUCCESS = '[Centre Cout Page] Get Centre Cout Success',
    GET_CONTRAT_START = '[Contrat Page] Get Contrat Start',
    GET_CONTRAT_SUCCESS = '[Contrat Page] Get Contrat Success',
    GET_DIRECTION_START = '[Direction Page] Get Direction Start',
    GET_DIRECTION_SUCCESS = '[Direction Page] Get Direction Success',
    GET_ENTITE_START = '[Entite Page] Get Entite Start',
    GET_ENTITE_SUCCESS = '[Entite Page] Get Entite Success',
    GET_FONCTION_START = '[Fonction Page] Get Fonction Start',
    GET_FONCTION_SUCCESS = '[Fonction Page] Get Fonction Success',
    GET_RUBRIQUE_START = '[Rubrique Page] Get Rubrique Start',
    GET_RUBRIQUE_SUCCESS = '[Rubrique Page] Get Rubrique Success',
    GET_EMPLOYE_START = '[Employe Page] Get Employe Start',
    GET_EMPLOYE_SUCCESS = '[Employe Page] Get Employe Success',


    PUT_VILLE_START = '[Ville Page] Put Ville Start',
    PUT_VILLE_SUCCESS = '[Ville Page] Put Ville Success',
    PUT_VARIABLE_START = '[Variable Page] Put Variable Start',
    PUT_VARIABLE_SUCCESS = '[Variable Page] Put Variable Success',
    PUT_FORMULE_START = '[Formule Page] Put Formule Start',
    PUT_FORMULE_SUCCESS = '[Formule Page] Put Formule Success',
    PUT_AFFECTATION_START = '[Affectation Page] Put Affectation Start',
    PUT_AFFECTATION_SUCCESS = '[Affectation Page] Put Affectation Success',
    PUT_CENTRE_COUT_START = '[Centre Cout Page] Put Centre Cout Start',
    PUT_CENTRE_COUT_SUCCESS = '[Centre Cout Page] Put Centre Cout Success',
    PUT_CONTRAT_START = '[Contrat Page] Put Contrat Start',
    PUT_CONTRAT_SUCCESS = '[Contrat Page] Put Contrat Success',
    PUT_DIRECTION_START = '[Direction Page] Put Direction Start',
    PUT_DIRECTION_SUCCESS = '[Direction Page] Put Direction Success',
    PUT_ENTITE_START = '[Entite Page] Put Entite Start',
    PUT_ENTITE_SUCCESS = '[Entite Page] Put Entite Success',
    PUT_FONCTION_START = '[Fonction Page] Put Fonction Start',
    PUT_FONCTION_SUCCESS = '[Fonction Page] Put Fonction Success',
    PUT_RUBRIQUE_START = '[Rubrique Page] Put Rubrique Start',
    PUT_RUBRIQUE_SUCCESS = '[Rubrique Page] Put Rubrique Success',
    PUT_EMPLOYE_START = '[Employe Page] Put Employe Start',
    PUT_EMPLOYE_SUCCESS = '[Employe Page] Put Employe Success',
    PUT_EMPLOYE_RUBRIQUE_START = '[Employe Page] Put Employe Rubrique Start',
    PUT_EMPLOYE_RUBRIQUE_SUCCESS = '[Employe Page] Put Employe Rubrique Success',
    PUT_FORMULE_VARIABLE_START = '[Formule Page] Put Formule Variable Start',
    PUT_FORMULE_VARIABLE_SUCCESS = '[Formule Page] Put Formule Variable Success',
    DELETE_EMPLOYE_RUBRIQUE_START = '[Employe Page] Delete Employe Rubrique Start',
    DELETE_EMPLOYE_RUBRIQUE_SUCCESS = '[Employe Page] Delete Employe Rubrique Success',
    DELETE_FORMULE_VARIABLE_START = '[Formule Page] Delete Formule Variable Start',
    DELETE_FORMULE_VARIABLE_SUCCESS = '[Formule Page] Delete Formule Variable Success',
}


export const modelPageChange=createAction(ActionTypes.MODEL_PAGE_CHANGE,props<{modelPage:ModelPage}>())
export const modelPageTypeChange=createAction(ActionTypes.MODEL_PAGE_TYPE_CHANGE,props<{modelPageType:ModelPageType}>())
export const getModelFailure=createAction(ActionTypes.GET_MODEL_FAILURE,props<{error:string}>())
export const putModelFailure=createAction(ActionTypes.PUT_MODEL_FAILURE,props<{putError:string}>())
export const isModelProgressBarChange=createAction(ActionTypes.IS_MODEL_PROGRESS_BAR)

// get start
export const getVilleStart=createAction(ActionTypes.GET_VILLE_START,props<{id:string | undefined}>())
export const getVariableStart=createAction(ActionTypes.GET_VARIABLE_START,props<{id:string | undefined}>())
export const getFormuleStart=createAction(ActionTypes.GET_FORMULE_START,props<{id:string | undefined}>())
export const getAffectationStart=createAction(ActionTypes.GET_AFFECTATION_START,props<{id:string | undefined}>())
export const getCentreCoutStart=createAction(ActionTypes.GET_CENTRE_COUT_START,props<{id:string | undefined}>())
export const getContratStart=createAction(ActionTypes.GET_CONTRAT_START,props<{id:string | undefined}>())
export const getDirectionStart=createAction(ActionTypes.GET_DIRECTION_START,props<{id:string | undefined}>())
export const getEntiteStart=createAction(ActionTypes.GET_ENTITE_START,props<{id:string | undefined}>())
export const getFonctionStart=createAction(ActionTypes.GET_FONCTION_START,props<{id:string | undefined}>())
export const getRubriqueStart=createAction(ActionTypes.GET_RUBRIQUE_START,props<{id:string | undefined}>())
export const getEmployeStart=createAction(ActionTypes.GET_EMPLOYE_START,props<{id:string | undefined}>())
// delete start
export const DeleteEmployeRubriqueStart=createAction(ActionTypes.DELETE_EMPLOYE_RUBRIQUE_START,props<{employeId:string,rubriqueId:string}>())
export const DeleteFormuleVariableStart=createAction(ActionTypes.DELETE_FORMULE_VARIABLE_START,props<{formuleId:string,variableId:string}>())
// delete success
export const DeleteEmployeRubriqueSuccess=createAction(ActionTypes.DELETE_EMPLOYE_RUBRIQUE_SUCCESS)
export const DeleteFormuleVariableSuccess=createAction(ActionTypes.DELETE_FORMULE_VARIABLE_SUCCESS)
// put start
export const PutVilleStart=createAction(ActionTypes.PUT_VILLE_START,props<{id:string | undefined,ville:VilleModel | undefined}>())
export const PutVariableStart=createAction(ActionTypes.PUT_VARIABLE_START,props<{id:string | undefined,variable:VariableModel | undefined}>())
export const PutFormuleStart=createAction(ActionTypes.PUT_FORMULE_START,props<{id:string | undefined,formule:FormuleModel | undefined}>())
export const PutAffectationStart=createAction(ActionTypes.PUT_AFFECTATION_START,props<{id:string | undefined,affectation:AffectationModel | undefined}>())
export const PutCentreCoutStart=createAction(ActionTypes.PUT_CENTRE_COUT_START,props<{id:string | undefined,centreCout:CentreCoutModel | undefined}>())
export const PutContratStart=createAction(ActionTypes.PUT_CONTRAT_START,props<{id:string | undefined,contrat:ContratModel | undefined}>())
export const PutDirectionStart=createAction(ActionTypes.PUT_DIRECTION_START,props<{id:string | undefined,direction:DirectionModel | undefined}>())
export const PutEntiteStart=createAction(ActionTypes.PUT_ENTITE_START,props<{id:string | undefined,entite:EntiteModel | undefined}>())
export const PutFonctionStart=createAction(ActionTypes.PUT_FONCTION_START,props<{id:string | undefined,fonction:FonctionModel | undefined}>())
export const PutRubriqueStart=createAction(ActionTypes.PUT_RUBRIQUE_START,props<{id:string | undefined,rubrique:RubriqueModel | undefined}>())
export const PutEmployeStart=createAction(ActionTypes.PUT_EMPLOYE_START,props<{id:string | undefined,employe:EmployeModel | undefined}>())
export const PutEmployeRubriqueStart=createAction(ActionTypes.PUT_EMPLOYE_RUBRIQUE_START,props<{employeId:string,rubriqueId:string,montant:number}>())
export const PutFormuleVariableStart=createAction(ActionTypes.PUT_FORMULE_VARIABLE_START,props<{formuleId:string,variableId:string}>())
//put success
export const PutVilleSuccess=createAction(ActionTypes.PUT_VILLE_SUCCESS,props<{ville:VilleModel | undefined}>())
export const PutVariableSuccess=createAction(ActionTypes.PUT_VARIABLE_SUCCESS,props<{variable:VariableModel | undefined}>())
export const PutFormuleSuccess=createAction(ActionTypes.PUT_FORMULE_SUCCESS,props<{formule:FormuleModel | undefined}>())
export const PutAffectationSuccess=createAction(ActionTypes.PUT_AFFECTATION_SUCCESS,props<{affectation:AffectationModel | undefined}>())
export const PutCentreCoutSuccess=createAction(ActionTypes.PUT_CENTRE_COUT_SUCCESS,props<{centreCout:CentreCoutModel | undefined}>())
export const PutContratSuccess=createAction(ActionTypes.PUT_CONTRAT_SUCCESS,props<{contrat:ContratModel | undefined}>())
export const PutDirectionSuccess=createAction(ActionTypes.PUT_DIRECTION_SUCCESS,props<{direction:DirectionModel | undefined}>())
export const PutEntiteSuccess=createAction(ActionTypes.PUT_ENTITE_SUCCESS,props<{entite:EntiteModel | undefined}>())
export const PutFonctionSuccess=createAction(ActionTypes.PUT_FONCTION_SUCCESS,props<{fonction:FonctionModel | undefined}>())
export const PutRubriqueSuccess=createAction(ActionTypes.PUT_RUBRIQUE_SUCCESS,props<{rubrique:RubriqueModel | undefined}>())
export const PutEmployeSuccess=createAction(ActionTypes.PUT_EMPLOYE_SUCCESS,props<{employe:EmployeModel | undefined}>())
export const PutEmployeRubriqueSuccess=createAction(ActionTypes.PUT_EMPLOYE_RUBRIQUE_SUCCESS)
export const PutFormuleVariableSuccess=createAction(ActionTypes.PUT_FORMULE_VARIABLE_SUCCESS)
//get success
export const getVilleSuccess=createAction(ActionTypes.GET_VILLE_SUCCESS,props<{ville:VilleModel | undefined}>())
export const getVariableSuccess=createAction(ActionTypes.GET_VARIABLE_SUCCESS,props<{variable:VariableModel | undefined}>())
export const getFormuleSuccess=createAction(ActionTypes.GET_FORMULE_SUCCESS,props<{formule:FormuleModel | undefined}>())
export const getAffectationSuccess=createAction(ActionTypes.GET_AFFECTATION_SUCCESS,props<{affectation:AffectationModel | undefined}>())
export const getCentreCoutSuccess=createAction(ActionTypes.GET_CENTRE_COUT_SUCCESS,props<{centreCout:CentreCoutModel | undefined}>())
export const getContratSuccess=createAction(ActionTypes.GET_CONTRAT_SUCCESS,props<{contrat:ContratModel | undefined}>())
export const getDirectionSuccess=createAction(ActionTypes.GET_DIRECTION_SUCCESS,props<{direction:DirectionModel | undefined}>())
export const getEntiteSuccess=createAction(ActionTypes.GET_ENTITE_SUCCESS,props<{entite:EntiteModel | undefined}>())
export const getFonctionSuccess=createAction(ActionTypes.GET_FONCTION_SUCCESS,props<{fonction:FonctionModel | undefined}>())
export const getRubriqueSuccess=createAction(ActionTypes.GET_RUBRIQUE_SUCCESS,props<{rubrique:RubriqueModel | undefined}>())
export const getEmployeSuccess=createAction(ActionTypes.GET_EMPLOYE_SUCCESS,props<{employe:EmployeModel | undefined}>())