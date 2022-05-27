import { createReducer, on } from "@ngrx/store"
import { DeleteAffectationSuccess, DeleteCentreCoutSuccess, DeleteContratSuccess, DeleteDirectionSuccess, DeleteEmployeSuccess, DeleteEntiteSuccess, DeleteFonctionSuccess, DeleteFormuleSuccess, DeleteRubriqueSuccess, DeleteVariableSuccess, DeleteVilleSuccess, getAffectationSuccess, getCentreCoutSuccess, getContratSuccess, getDirectionSuccess, getEmployeSuccess, getEntiteSuccess, getFonctionSuccess, getFormuleSuccess, getModelFailure, getRubriqueSuccess, getVariableSuccess, getVilleSuccess, isModelProgressBarChange, modelPageChange, modelPageTypeChange, PostAffectationSuccess, PostCentreCoutSuccess, PostContratSuccess, PostDirectionSuccess, PostEmployeSuccess, PostEntiteSuccess, PostFonctionSuccess, PostFormuleSuccess, postModelFailure, PostRubriqueSuccess, PostVariableSuccess, PostVilleSuccess, PutAffectationSuccess, PutCentreCoutSuccess, PutContratSuccess, PutDirectionSuccess, PutEmployeSuccess, PutEntiteSuccess, PutFonctionSuccess, PutFormuleSuccess, putModelFailure, PutRubriqueSuccess, PutVariableSuccess, PutVilleSuccess } from "./model.actions"
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
    on(postModelFailure,(state:any,action:any)=>{
        return {
            ...state,
            postError:action.postError,
        }
    }),
    //-----------------DELETE-------------------
    on(DeleteVilleSuccess,(state:any,action:any)=>{
        return {
            ...state,
            ville:action.ville,
            isModelProgressBar:false,
        }
    }),
    on(DeleteVariableSuccess,(state:any,action:any)=>{
        return {
            ...state,
            variable:action.variable,
            isModelProgressBar:false,
        }
    }),
    on(DeleteFormuleSuccess,(state:any,action:any)=>{
        return {
            ...state,
            formule:action.formule,
            isModelProgressBar:false,
        }
    }),
    on(DeleteAffectationSuccess,(state:any,action:any)=>{
        return {
            ...state,
            affectation:action.affectation,
            isModelProgressBar:false,
        }
    }),
    on(DeleteCentreCoutSuccess,(state:any,action:any)=>{
        return {
            ...state,
            centreCout:action.centreCout,
            isModelProgressBar:false,
        }
    }),
    on(DeleteContratSuccess,(state:any,action:any)=>{
        return {
            ...state,
            contrat:action.contrat,
            isModelProgressBar:false,
        }
    }),
    on(DeleteDirectionSuccess,(state:any,action:any)=>{
        return {
            ...state,
            direction:action.direction,
            isModelProgressBar:false,
        }
    }),
    on(DeleteEntiteSuccess,(state:any,action:any)=>{
        return {
            ...state,
            entite:action.entite,
            isModelProgressBar:false,
        }
    }),
    on(DeleteFonctionSuccess,(state:any,action:any)=>{
        return {
            ...state,
            fonction:action.fonction,
            isModelProgressBar:false,
        }
    }),
    on(DeleteRubriqueSuccess,(state:any,action:any)=>{
        return {
            ...state,
            rubrique:action.rubrique,
            isModelProgressBar:false,
        }
    }),
    on(DeleteEmployeSuccess,(state:any,action:any)=>{
        return {
            ...state,
            employe:action.employe,
            isModelProgressBar:false,
        }
    }),
    //-----------------POST---------------------
    on(PostVilleSuccess,(state:any,action:any)=>{
        return {
            ...state,
            ville:action.ville,
            isModelProgressBar:false,
        }
    }),
    on(PostVariableSuccess,(state:any,action:any)=>{
        return {
            ...state,
            variable:action.variable,
            isModelProgressBar:false,
        }
    }),
    on(PostFormuleSuccess,(state:any,action:any)=>{
        return {
            ...state,
            formule:action.formule,
            isModelProgressBar:false,
        }
    }),
    on(PostAffectationSuccess,(state:any,action:any)=>{
        return {
            ...state,
            affectation:action.affectation,
            isModelProgressBar:false,
        }
    }),
    on(PostCentreCoutSuccess,(state:any,action:any)=>{
        return {
            ...state,
            centreCout:action.centreCout,
            isModelProgressBar:false,
        }
    }),
    on(PostContratSuccess,(state:any,action:any)=>{
        return {
            ...state,
            contrat:action.contrat,
            isModelProgressBar:false,
        }
    }),
    on(PostDirectionSuccess,(state:any,action:any)=>{
        return {
            ...state,
            direction:action.direction,
            isModelProgressBar:false,
        }
    }),
    on(PostEntiteSuccess,(state:any,action:any)=>{
        return {
            ...state,
            entite:action.entite,
            isModelProgressBar:false,
        }
    }),
    on(PostFonctionSuccess,(state:any,action:any)=>{
        return {
            ...state,
            fonction:action.fonction,
            isModelProgressBar:false,
        }
    }),
    on(PostRubriqueSuccess,(state:any,action:any)=>{
        return {
            ...state,
            rubrique:action.rubrique,
            isModelProgressBar:false,
        }
    }),
    on(PostEmployeSuccess,(state:any,action:any)=>{
        return {
            ...state,
            employe:action.employe,
            isModelProgressBar:false,
        }
    }),
    //-----------------GET------------------------
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