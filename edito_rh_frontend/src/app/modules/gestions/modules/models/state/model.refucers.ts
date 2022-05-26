import { createReducer, on } from "@ngrx/store"
import { getAffectationSuccess, getCentreCoutSuccess, getContratSuccess, getDirectionSuccess, getEmployeSuccess, getEntiteSuccess, getFonctionSuccess, getFormuleSuccess, getModelFailure, getRubriqueSuccess, getVariableSuccess, getVilleSuccess, isModelProgressBarChange, modelPageChange, modelPageTypeChange, PutAffectationSuccess, PutCentreCoutSuccess, PutContratSuccess, PutDirectionSuccess, PutEmployeSuccess, PutEntiteSuccess, PutFonctionSuccess, PutFormuleSuccess, putModelFailure, PutRubriqueSuccess, PutVariableSuccess, PutVilleSuccess } from "./model.actions"
import { initialState } from "./model.state"


const _modelReducer= createReducer(
    initialState,
    on(modelPageChange,(state:any,action:any)=>{
        return {
            ...state,
            modelPage:action.modelPage,
        }
    }),
    on(modelPageTypeChange,(state:any,action:any)=>{
        return {
            ...state,
            modelPageType:action.modelPageType,
        }
    }),
    on(getModelFailure,(state:any,action:any)=>{
        return {
            ...state,
            error:action.error,
        }
    }),
    on(putModelFailure,(state:any,action:any)=>{
        return {
            ...state,
            putError:action.putError,
        }
    }),
    on(getVilleSuccess,(state:any,action:any)=>{
        return {
            ...state,
            ville:action.ville,
            isModelProgressBar:false,
        }
    }),
    on(getVariableSuccess,(state:any,action:any)=>{
        return {
            ...state,
            variable:action.variable,
            isModelProgressBar:false,
        }
    }),
    on(getFormuleSuccess,(state:any,action:any)=>{
        return {
            ...state,
            formule:action.formule,
            isModelProgressBar:false,
        }
    }),
    on(getAffectationSuccess,(state:any,action:any)=>{
        return {
            ...state,
            affectation:action.affectation,
            isModelProgressBar:false,
        }
    }),
    on(getCentreCoutSuccess,(state:any,action:any)=>{
        return {
            ...state,
            centreCout:action.centreCout,
            isModelProgressBar:false,
        }
    }),
    on(getContratSuccess,(state:any,action:any)=>{
        return {
            ...state,
            contrat:action.contrat,
            isModelProgressBar:false,
        }
    }),
    on(getDirectionSuccess,(state:any,action:any)=>{
        return {
            ...state,
            direction:action.direction,
            isModelProgressBar:false,
        }
    }),
    on(getEntiteSuccess,(state:any,action:any)=>{
        return {
            ...state,
            entite:action.entite,
            isModelProgressBar:false,
        }
    }),
    on(getFonctionSuccess,(state:any,action:any)=>{
        return {
            ...state,
            fonction:action.fonction,
            isModelProgressBar:false,
        }
    }),
    on(getRubriqueSuccess,(state:any,action:any)=>{
        return {
            ...state,
            rubrique:action.rubrique,
            isModelProgressBar:false,
        }
    }),
    on(getEmployeSuccess,(state:any,action:any)=>{
        return {
            ...state,
            employe:action.employe,
            isModelProgressBar:false,
        }
    }),
    //......................PUT...............................
    on(PutVilleSuccess,(state:any,action:any)=>{
        return {
            ...state,
            ville:action.ville,
            isModelProgressBar:false,
        }
    }),
    on(PutVariableSuccess,(state:any,action:any)=>{
        return {
            ...state,
            variable:action.variable,
            isModelProgressBar:false,
        }
    }),
    on(PutFormuleSuccess,(state:any,action:any)=>{
        return {
            ...state,
            formule:action.formule,
            isModelProgressBar:false,
        }
    }),
    on(PutAffectationSuccess,(state:any,action:any)=>{
        return {
            ...state,
            affectation:action.affectation,
            isModelProgressBar:false,
        }
    }),
    on(PutCentreCoutSuccess,(state:any,action:any)=>{
        return {
            ...state,
            centreCout:action.centreCout,
            isModelProgressBar:false,
        }
    }),
    on(PutContratSuccess,(state:any,action:any)=>{
        return {
            ...state,
            contrat:action.contrat,
            isModelProgressBar:false,
        }
    }),
    on(PutDirectionSuccess,(state:any,action:any)=>{
        return {
            ...state,
            direction:action.direction,
            isModelProgressBar:false,
        }
    }),
    on(PutEntiteSuccess,(state:any,action:any)=>{
        return {
            ...state,
            entite:action.entite,
            isModelProgressBar:false,
        }
    }),
    on(PutFonctionSuccess,(state:any,action:any)=>{
        return {
            ...state,
            fonction:action.fonction,
            isModelProgressBar:false,
        }
    }),
    on(PutRubriqueSuccess,(state:any,action:any)=>{
        return {
            ...state,
            rubrique:action.rubrique,
            isModelProgressBar:false,
        }
    }),
    on(PutEmployeSuccess,(state:any,action:any)=>{
        return {
            ...state,
            employe:action.employe,
            isModelProgressBar:false,
        }
    }),
    on(isModelProgressBarChange,(state:any,action:any)=>{
        return {
            ...state,
            isModelProgressBar:!state.isModelProgressBar
        }
    }),
)


export function modelReducer(state:any,action:any){
    return _modelReducer(state,action)
}