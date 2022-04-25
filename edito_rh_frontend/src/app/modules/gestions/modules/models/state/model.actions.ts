import { createAction,props } from "@ngrx/store";
import { ModelPage, ModelPageType } from "./model.state";


enum ActionTypes {
    MODEL_PAGE_CHANGE = '[Model Page] Model Page change',
    MODEL_PAGE_TYPE_CHANGE = '[Model Type Page] Model Page Type change',
}


export const modelPageChange=createAction(ActionTypes.MODEL_PAGE_CHANGE,props<{modelPage:ModelPage}>())
export const modelPageTypeChange=createAction(ActionTypes.MODEL_PAGE_TYPE_CHANGE,props<{modelPageType:ModelPageType}>())