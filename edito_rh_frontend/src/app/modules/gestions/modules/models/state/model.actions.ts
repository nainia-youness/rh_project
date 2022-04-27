import { createAction,props } from "@ngrx/store";
import { FormuleModel } from "src/app/shared/models/formule.model";
import { VariableModel } from "src/app/shared/models/variable.model";
import { VilleModel } from "src/app/shared/models/ville.model";
import { ModelPage, ModelPageType } from "./model.state";


enum ActionTypes {
    MODEL_PAGE_CHANGE = '[Model Page] Model Page change',
    IS_MODEL_PROGRESS_BAR = '[Model Page] Is Model Progress Bar change',
    MODEL_PAGE_TYPE_CHANGE = '[Model Type Page] Model Page Type change',
    GET_MODEL_FAILURE = '[Model Page] Get Model Failure',
    GET_VILLE_START = '[Ville Page] Get Ville Start',
    GET_VILLE_SUCCESS = '[Ville Page] Get Ville Success',
    GET_VARIABLE_START = '[Variable Page] Get Variable Start',
    GET_VARIABLE_SUCCESS = '[Variable Page] Get Variable Success',
    GET_FORMULE_START = '[Formule Page] Get Formule Start',
    GET_FORMULE_SUCCESS = '[Formule Page] Get Formule Success',
}


export const modelPageChange=createAction(ActionTypes.MODEL_PAGE_CHANGE,props<{modelPage:ModelPage}>())
export const modelPageTypeChange=createAction(ActionTypes.MODEL_PAGE_TYPE_CHANGE,props<{modelPageType:ModelPageType}>())
export const getModelFailure=createAction(ActionTypes.GET_MODEL_FAILURE,props<{error:string}>())
export const isModelProgressBarChange=createAction(ActionTypes.IS_MODEL_PROGRESS_BAR)

//start
export const getVilleStart=createAction(ActionTypes.GET_VILLE_START,props<{id:string | undefined}>())
export const getVariableStart=createAction(ActionTypes.GET_VARIABLE_START,props<{id:string | undefined}>())
export const getFormuleStart=createAction(ActionTypes.GET_FORMULE_START,props<{id:string | undefined}>())
//success
export const getVilleSuccess=createAction(ActionTypes.GET_VILLE_SUCCESS,props<{ville:VilleModel | undefined}>())
export const getVariableSuccess=createAction(ActionTypes.GET_VARIABLE_SUCCESS,props<{variable:VariableModel | undefined}>())
export const getFormuleSuccess=createAction(ActionTypes.GET_FORMULE_SUCCESS,props<{formule:FormuleModel | undefined}>())