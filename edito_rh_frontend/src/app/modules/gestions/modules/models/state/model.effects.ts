import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType} from "@ngrx/effects";
import { exhaustMap, map, of,concatMap,mergeMap  } from "rxjs";
import {catchError} from 'rxjs/operators'; 
import { Store,select } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { DeleteAffectationStart, DeleteAffectationSuccess, DeleteCentreCoutStart, DeleteCentreCoutSuccess, DeleteContratStart, DeleteContratSuccess, DeleteDirectionStart, DeleteDirectionSuccess, DeleteEmployeRubriqueStart, DeleteEmployeRubriqueSuccess, DeleteEmployeStart, DeleteEmployeSuccess, DeleteEntiteStart, DeleteEntiteSuccess, DeleteFonctionStart, DeleteFonctionSuccess, DeleteFormuleStart, DeleteFormuleSuccess, DeleteFormuleVariableStart, DeleteFormuleVariableSuccess, DeleteRubriqueStart, DeleteRubriqueSuccess, DeleteVariableStart, DeleteVariableSuccess, DeleteVilleStart, DeleteVilleSuccess, getAffectationStart, getAffectationSuccess, getCentreCoutStart, getCentreCoutSuccess, getContratStart, getContratSuccess, getDirectionStart, getDirectionSuccess,getEmployeStart, getEmployeSuccess, getEntiteStart, getEntiteSuccess, getFonctionStart, getFonctionSuccess, getFormuleStart, getFormuleSuccess, getModelFailure, getRubriqueStart, getRubriqueSuccess, getVariableStart, getVariableSuccess, getVilleStart, getVilleSuccess, PostAffectationStart, PostAffectationSuccess, PostCentreCoutStart, PostCentreCoutSuccess, PostContratStart, PostContratSuccess, PostDirectionStart, PostDirectionSuccess, PostEmployeStart, PostEmployeSuccess, PostEntiteStart, PostFonctionStart, PostFonctionSuccess, PostFormuleStart, PostFormuleSuccess, postModelFailure, PostRubriqueStart, PostRubriqueSuccess, PostVariableStart, PostVariableSuccess, PostVilleStart, PostVilleSuccess, PutAffectationStart, PutAffectationSuccess, PutCentreCoutStart, PutCentreCoutSuccess, PutContratStart, PutContratSuccess, PutDirectionStart, PutDirectionSuccess, PutEmployeRubriqueStart, PutEmployeRubriqueSuccess, PutEmployeStart, PutEmployeSuccess, PutEntiteStart, PutEntiteSuccess, PutFonctionStart, PutFonctionSuccess, PutFormuleStart, PutFormuleSuccess, PutFormuleVariableStart, PutFormuleVariableSuccess, putModelFailure, PutRubriqueStart, PutRubriqueSuccess, PutVariableStart, PutVariableSuccess, PutVilleStart, PutVilleSuccess } from "./model.actions";
import { VilleService } from "src/app/core/services/http/villes/ville.service";
import { VilleBuilderService } from "src/app/core/services/utils/builders/ville_builder/ville-builder.service";
import { getLogs } from "src/app/shared/components/layout/state/layout.actions";
import { Logs } from "src/app/shared/components/layout/state/layout.interface";
import { getMetadata } from "../../../state/gestion.actions";
import { ErrorHandlerService } from "src/app/core/services/error/error-handler.service";
import { VariableService } from "src/app/core/services/http/variables/variable.service";
import { VariableBuilderService } from "src/app/core/services/utils/builders/variable_builder/variable-builder.service";
import { FormuleService } from "src/app/core/services/http/formules/formule.service";
import { FormuleBuilderService } from "src/app/core/services/utils/builders/formule_builder/formule-builder.service";
import { Variable } from "@angular/compiler/src/render3/r3_ast";
import { VariableModel } from "src/app/shared/models/variable.model";
import { FonctionService } from "src/app/core/services/http/fonctions/fonction.service";
import { ContratService } from "src/app/core/services/http/contrats/contrat.service";
import { DirectionService } from "src/app/core/services/http/directions/direction.service";
import { EntiteService } from "src/app/core/services/http/entites/entite.service";
import { CentreCoutService } from "src/app/core/services/http/centres_cout/centre-cout.service";
import { AffectationService } from "src/app/core/services/http/affectations/affectation.service";
import { EmployeService } from "src/app/core/services/http/employes/employe.service";
import { RubriqueService } from "src/app/core/services/http/rubriques/rubrique.service";
import { FonctionBuilderService } from "src/app/core/services/utils/builders/fonction_builder/fonction-builder.service";
import { EntiteBuilderService } from "src/app/core/services/utils/builders/entite_builder/entite-builder.service";
import { DirectionBuilderService } from "src/app/core/services/utils/builders/direction_builder/direction-builder.service";
import { ContratBuilderService } from "src/app/core/services/utils/builders/contrat_builder/contrat-builder.service";
import { CentreCoutBuilderService } from "src/app/core/services/utils/builders/centre_cout_builder/centre-cout-builder.service";
import { AffectationBuilderService } from "src/app/core/services/utils/builders/affectation_builder/affectation-builder.service";
import { EmployeBuilderService } from "src/app/core/services/utils/builders/employe_builder/employe-builder.service";
import { RubriqueBuilderService } from "src/app/core/services/utils/builders/rubrique_builder/rubrique-builder.service";
import { deleteModelFailureSelector } from "./model.selectors";




@Injectable()
export class ModelEffects{

    getVille$:any=createEffect(():any=>
            this.actions$.pipe(
                ofType(getVilleStart),
                exhaustMap(
                    (action)=> this.villeService.getVille(action)
                    .pipe(
                        map((res):any=>{
                            const villeModel=this.villeBuilder.buildVilles([res.data])![0]
                            const logs:Logs={
                                user_nom:res.data.user.nom,
                                user_prenom:res.data.user.prenom,
                                date_derniere_operation:res.data.date_derniere_operation,
                                derniere_operation:res.data.derniere_operation
                            }
                            this.store.dispatch(getLogs({logs:logs}))
                            this.store.dispatch(getMetadata({metadata:res.metadata}))
                            return getVilleSuccess({ville:villeModel})
                        }),
                        catchError((error):any=>{
                            const errorMessage = this.errorHandler.handleError(error)
                            console.log(error)
                            return of(getModelFailure({error:errorMessage}))
                        }
                        ) 
                    )
                ),
            )
    )

    // -----------------------DELETE--------------------------------------
    deleteVille$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(DeleteVilleStart),
            exhaustMap(
                (action)=> this.villeService.deleteVille(action)
                .pipe(
                    map((res):any=>{
                        return DeleteVilleSuccess()
                    }),
                    catchError((error):any=>{
                        const errorMessage = this.errorHandler.handleError(error)
                        console.log(error)
                        return of(deleteModelFailureSelector({deleteError:errorMessage}))
                    }
                    ) 
                )
            ),
        )
    )

    deleteVariable$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(DeleteVariableStart),
        exhaustMap(
            (action)=> this.variableService.deleteVariable(action)
            .pipe(
                map((res):any=>{ 
                    return DeleteVariableSuccess()
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(deleteModelFailureSelector({deleteError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )


    deleteRubrique$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(DeleteRubriqueStart),
        exhaustMap(
            (action)=> this.rubriqueService.deleteRubrique(action)
            .pipe(
                map((res):any=>{    
                    return DeleteRubriqueSuccess()
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(deleteModelFailureSelector({deleteError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    deleteFormule$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(DeleteFormuleStart),
        exhaustMap(
            (action)=> this.formuleService.deleteFormule(action)
            .pipe(
                map((res):any=>{
                    return DeleteFormuleSuccess()
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(deleteModelFailureSelector({deleteError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    deleteFonction$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(DeleteFonctionStart),
        exhaustMap(
            (action)=> this.fonctionService.deleteFonction(action)
            .pipe(
                map((res):any=>{  
                    return DeleteFonctionSuccess()
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(deleteModelFailureSelector({deleteError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    deleteEntite$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(DeleteEntiteStart),
        exhaustMap(
            (action)=> this.entiteService.deleteEntite(action)
            .pipe(
                map((res):any=>{
                    return DeleteEntiteSuccess()
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(deleteModelFailureSelector({deleteError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )
    
    deleteEmploye$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(DeleteEmployeStart),
        exhaustMap(
            (action)=> this.employeService.deleteEmploye(action)
            .pipe(
                map((res):any=>{    
                    return DeleteEmployeSuccess()
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(deleteModelFailureSelector({deleteError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    deleteDirection$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(DeleteDirectionStart),
        exhaustMap(
            (action)=> this.directionService.deleteDirection(action)
            .pipe(
                map((res):any=>{
                    return DeleteDirectionSuccess()
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(deleteModelFailureSelector({deleteError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    deleteContrat$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(DeleteContratStart),
        exhaustMap(
            (action)=> this.contratService.deleteContrat(action)
            .pipe(
                map((res):any=>{
                    return DeleteContratSuccess()
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(deleteModelFailureSelector({deleteError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    deleteCentreCout$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(DeleteCentreCoutStart),
        exhaustMap(
            (action)=> this.centreCoutService.deleteCentreCout(action)
            .pipe(
                map((res):any=>{
                    return DeleteCentreCoutSuccess()
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(deleteModelFailureSelector({deleteError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    deleteAffectation$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(DeleteAffectationStart),
        exhaustMap(
            (action)=> this.affectationService.deleteAffectation(action)
            .pipe(
                map((res):any=>{   
                    return DeleteAffectationSuccess()
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(deleteModelFailureSelector({deleteError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )
    // -----------------------POST--------------------------------------
    postVille$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(PostVilleStart),
            exhaustMap(
                (action)=> this.villeService.postVille(action)
                .pipe(
                    map((res):any=>{
                        const villeModel=this.villeBuilder.buildVilles([res.data])![0]
                        const logs:Logs={
                            user_nom:res.data.user.nom,
                            user_prenom:res.data.user.prenom,
                            date_derniere_operation:res.data.date_derniere_operation,
                            derniere_operation:res.data.derniere_operation
                        }
                        this.store.dispatch(getLogs({logs:logs}))     
                        return PostVilleSuccess({ville:villeModel})
                    }),
                    catchError((error):any=>{
                        const errorMessage = this.errorHandler.handleError(error)
                        console.log(error)
                        return of(postModelFailure({postError:errorMessage}))
                    }
                    ) 
                )
            ),
        )
    )

    postVariable$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(PostVariableStart),
        exhaustMap(
            (action)=> this.variableService.postVariable(action)
            .pipe(
                map((res):any=>{
                    const variableModel=this.variableBuilder.buildVariables([res.data])![0]
                    const logs:Logs={
                        user_nom:res.data.user.nom,
                        user_prenom:res.data.user.prenom,
                        date_derniere_operation:res.data.date_derniere_operation,
                        derniere_operation:res.data.derniere_operation
                    }
                    this.store.dispatch(getLogs({logs:logs}))     
                    return PostVariableSuccess({variable:variableModel})
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(postModelFailure({postError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )


    postRubrique$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(PostRubriqueStart),
        exhaustMap(
            (action)=> this.rubriqueService.postRubrique(action)
            .pipe(
                map((res):any=>{
                    const RubriqueModel=this.rubriqueBuilder.buildRubriques([res.data])![0]
                    const logs:Logs={
                        user_nom:res.data.user.nom,
                        user_prenom:res.data.user.prenom,
                        date_derniere_operation:res.data.date_derniere_operation,
                        derniere_operation:res.data.derniere_operation
                    }
                    this.store.dispatch(getLogs({logs:logs}))     
                    return PostRubriqueSuccess({rubrique:RubriqueModel})
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(postModelFailure({postError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    postFormule$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(PostFormuleStart),
        exhaustMap(
            (action)=> this.formuleService.postFormule(action)
            .pipe(
                map((res):any=>{
                    const FormuleModel=this.formuleBuilder.buildFormules([res.data],true)![0]

                    const logs:Logs={
                        user_nom:res.data.user.nom,
                        user_prenom:res.data.user.prenom,
                        date_derniere_operation:res.data.date_derniere_operation,
                        derniere_operation:res.data.derniere_operation
                    }
                    this.store.dispatch(getLogs({logs:logs}))     
                    return PostFormuleSuccess({formule:FormuleModel})
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(postModelFailure({postError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    postFonction$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(PostFonctionStart),
        exhaustMap(
            (action)=> this.fonctionService.postFonction(action)
            .pipe(
                map((res):any=>{
                    const FonctionModel=this.fonctionBuilder.buildFonctions([res.data])![0]
                    const logs:Logs={
                        user_nom:res.data.user.nom,
                        user_prenom:res.data.user.prenom,
                        date_derniere_operation:res.data.date_derniere_operation,
                        derniere_operation:res.data.derniere_operation
                    }
                    this.store.dispatch(getLogs({logs:logs}))     
                    return PostFonctionSuccess({fonction:FonctionModel})
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(postModelFailure({postError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    postEntite$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(PostEntiteStart),
        exhaustMap(
            (action)=> this.entiteService.postEntite(action)
            .pipe(
                map((res):any=>{
                    const EntiteModel=this.entiteBuilder.buildEntites([res.data])![0]
                    const logs:Logs={
                        user_nom:res.data.user.nom,
                        user_prenom:res.data.user.prenom,
                        date_derniere_operation:res.data.date_derniere_operation,
                        derniere_operation:res.data.derniere_operation
                    }
                    this.store.dispatch(getLogs({logs:logs}))     
                    return PutEntiteSuccess({entite:EntiteModel})
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(postModelFailure({postError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )
    
    postEmploye$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(PostEmployeStart),
        exhaustMap(
            (action)=> this.employeService.postEmploye(action)
            .pipe(
                map((res):any=>{
                    const EmployeModel=this.employeBuilder.buildEmployes([res.data],true)![0]
                    const logs:Logs={
                        user_nom:res.data.user.nom,
                        user_prenom:res.data.user.prenom,
                        date_derniere_operation:res.data.date_derniere_operation,
                        derniere_operation:res.data.derniere_operation
                    }
                    this.store.dispatch(getLogs({logs:logs}))     
                    return PostEmployeSuccess({employe:EmployeModel})
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(postModelFailure({postError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    postDirection$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(PostDirectionStart),
        exhaustMap(
            (action)=> this.directionService.postDirection(action)
            .pipe(
                map((res):any=>{
                    const DirectionModel=this.directionBuilder.buildDirections([res.data])![0]
                    const logs:Logs={
                        user_nom:res.data.user.nom,
                        user_prenom:res.data.user.prenom,
                        date_derniere_operation:res.data.date_derniere_operation,
                        derniere_operation:res.data.derniere_operation
                    }
                    this.store.dispatch(getLogs({logs:logs}))     
                    return PostDirectionSuccess({direction:DirectionModel})
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(postModelFailure({postError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    postContrat$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(PostContratStart),
        exhaustMap(
            (action)=> this.contratService.postContrat(action)
            .pipe(
                map((res):any=>{
                    const ContratModel=this.contratBuilder.buildContrats([res.data])![0]
                    const logs:Logs={
                        user_nom:res.data.user.nom,
                        user_prenom:res.data.user.prenom,
                        date_derniere_operation:res.data.date_derniere_operation,
                        derniere_operation:res.data.derniere_operation
                    }
                    this.store.dispatch(getLogs({logs:logs}))     
                    return PostContratSuccess({contrat:ContratModel})
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(postModelFailure({postError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    postCentreCout$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(PostCentreCoutStart),
        exhaustMap(
            (action)=> this.centreCoutService.postCentreCout(action)
            .pipe(
                map((res):any=>{
                    const CentreCoutModel=this.centreCoutBuilder.buildCentresCout([res.data])![0]
                    const logs:Logs={
                        user_nom:res.data.user.nom,
                        user_prenom:res.data.user.prenom,
                        date_derniere_operation:res.data.date_derniere_operation,
                        derniere_operation:res.data.derniere_operation
                    }
                    this.store.dispatch(getLogs({logs:logs}))     
                    return PostCentreCoutSuccess({centreCout:CentreCoutModel})
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(postModelFailure({postError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    postAffectation$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(PostAffectationStart),
        exhaustMap(
            (action)=> this.affectationService.postAffectation(action)
            .pipe(
                map((res):any=>{
                    const AffectationModel=this.affectationBuilder.buildAffectations([res.data])![0]
                    const logs:Logs={
                        user_nom:res.data.user.nom,
                        user_prenom:res.data.user.prenom,
                        date_derniere_operation:res.data.date_derniere_operation,
                        derniere_operation:res.data.derniere_operation
                    }
                    this.store.dispatch(getLogs({logs:logs}))     
                    return PostAffectationSuccess({affectation:AffectationModel})
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(postModelFailure({postError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )
    //------------------------Put------------------------
    putVille$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(PutVilleStart),
        exhaustMap(
            (action)=> this.villeService.putVille(action)
            .pipe(
                map((res):any=>{
                    const villeModel=this.villeBuilder.buildVilles([res.data])![0]
                    const logs:Logs={
                        user_nom:res.data.user.nom,
                        user_prenom:res.data.user.prenom,
                        date_derniere_operation:res.data.date_derniere_operation,
                        derniere_operation:res.data.derniere_operation
                    }
                    this.store.dispatch(getLogs({logs:logs}))     
                    return PutVilleSuccess({ville:villeModel})
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(putModelFailure({putError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    putVariable$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(PutVariableStart),
        exhaustMap(
            (action)=> this.variableService.putVariable(action)
            .pipe(
                map((res):any=>{
                    const variableModel=this.variableBuilder.buildVariables([res.data])![0]
                    const logs:Logs={
                        user_nom:res.data.user.nom,
                        user_prenom:res.data.user.prenom,
                        date_derniere_operation:res.data.date_derniere_operation,
                        derniere_operation:res.data.derniere_operation
                    }
                    this.store.dispatch(getLogs({logs:logs}))     
                    return PutVariableSuccess({variable:variableModel})
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(putModelFailure({putError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )
    putRubrique$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(PutRubriqueStart),
        exhaustMap(
            (action)=> this.rubriqueService.putRubrique(action)
            .pipe(
                map((res):any=>{
                    const RubriqueModel=this.rubriqueBuilder.buildRubriques([res.data])![0]
                    const logs:Logs={
                        user_nom:res.data.user.nom,
                        user_prenom:res.data.user.prenom,
                        date_derniere_operation:res.data.date_derniere_operation,
                        derniere_operation:res.data.derniere_operation
                    }
                    this.store.dispatch(getLogs({logs:logs}))     
                    return PutRubriqueSuccess({rubrique:RubriqueModel})
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(putModelFailure({putError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    putFormule$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(PutFormuleStart),
        exhaustMap(
            (action)=> this.formuleService.putFormule(action)
            .pipe(
                map((res):any=>{
                    const FormuleModel=this.formuleBuilder.buildFormules([res.data],true)![0]
                    console.log(FormuleModel)
                    const logs:Logs={
                        user_nom:res.data.user.nom,
                        user_prenom:res.data.user.prenom,
                        date_derniere_operation:res.data.date_derniere_operation,
                        derniere_operation:res.data.derniere_operation
                    }
                    this.store.dispatch(getLogs({logs:logs}))     
                    return PutFormuleSuccess({formule:FormuleModel})
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(putModelFailure({putError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    putFonction$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(PutFonctionStart),
        exhaustMap(
            (action)=> this.fonctionService.putFonction(action)
            .pipe(
                map((res):any=>{
                    const FonctionModel=this.fonctionBuilder.buildFonctions([res.data])![0]
                    const logs:Logs={
                        user_nom:res.data.user.nom,
                        user_prenom:res.data.user.prenom,
                        date_derniere_operation:res.data.date_derniere_operation,
                        derniere_operation:res.data.derniere_operation
                    }
                    this.store.dispatch(getLogs({logs:logs}))     
                    return PutFonctionSuccess({fonction:FonctionModel})
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(putModelFailure({putError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    putEntite$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(PutEntiteStart),
        exhaustMap(
            (action)=> this.entiteService.putEntite(action)
            .pipe(
                map((res):any=>{
                    const EntiteModel=this.entiteBuilder.buildEntites([res.data])![0]
                    const logs:Logs={
                        user_nom:res.data.user.nom,
                        user_prenom:res.data.user.prenom,
                        date_derniere_operation:res.data.date_derniere_operation,
                        derniere_operation:res.data.derniere_operation
                    }
                    this.store.dispatch(getLogs({logs:logs}))     
                    return PutEntiteSuccess({entite:EntiteModel})
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(putModelFailure({putError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )
    
    putEmploye$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(PutEmployeStart),
        exhaustMap(
            (action)=> this.employeService.putEmploye(action)
            .pipe(
                map((res):any=>{
                    const EmployeModel=this.employeBuilder.buildEmployes([res.data],true)![0]
                    const logs:Logs={
                        user_nom:res.data.user.nom,
                        user_prenom:res.data.user.prenom,
                        date_derniere_operation:res.data.date_derniere_operation,
                        derniere_operation:res.data.derniere_operation
                    }
                    this.store.dispatch(getLogs({logs:logs}))     
                    return PutEmployeSuccess({employe:EmployeModel})
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(putModelFailure({putError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    putDirection$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(PutDirectionStart),
        exhaustMap(
            (action)=> this.directionService.putDirection(action)
            .pipe(
                map((res):any=>{
                    const DirectionModel=this.directionBuilder.buildDirections([res.data])![0]
                    const logs:Logs={
                        user_nom:res.data.user.nom,
                        user_prenom:res.data.user.prenom,
                        date_derniere_operation:res.data.date_derniere_operation,
                        derniere_operation:res.data.derniere_operation
                    }
                    this.store.dispatch(getLogs({logs:logs}))     
                    return PutDirectionSuccess({direction:DirectionModel})
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(putModelFailure({putError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    putContrat$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(PutContratStart),
        exhaustMap(
            (action)=> this.contratService.putContrat(action)
            .pipe(
                map((res):any=>{
                    const ContratModel=this.contratBuilder.buildContrats([res.data])![0]
                    const logs:Logs={
                        user_nom:res.data.user.nom,
                        user_prenom:res.data.user.prenom,
                        date_derniere_operation:res.data.date_derniere_operation,
                        derniere_operation:res.data.derniere_operation
                    }
                    this.store.dispatch(getLogs({logs:logs}))     
                    return PutContratSuccess({contrat:ContratModel})
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(putModelFailure({putError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    putCentreCout$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(PutCentreCoutStart),
        exhaustMap(
            (action)=> this.centreCoutService.putCentreCout(action)
            .pipe(
                map((res):any=>{
                    const CentreCoutModel=this.centreCoutBuilder.buildCentresCout([res.data])![0]
                    const logs:Logs={
                        user_nom:res.data.user.nom,
                        user_prenom:res.data.user.prenom,
                        date_derniere_operation:res.data.date_derniere_operation,
                        derniere_operation:res.data.derniere_operation
                    }
                    this.store.dispatch(getLogs({logs:logs}))     
                    return PutCentreCoutSuccess({centreCout:CentreCoutModel})
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(putModelFailure({putError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    putAffectation$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(PutAffectationStart),
        exhaustMap(
            (action)=> this.affectationService.putAffectation(action)
            .pipe(
                map((res):any=>{
                    const AffectationModel=this.affectationBuilder.buildAffectations([res.data])![0]
                    const logs:Logs={
                        user_nom:res.data.user.nom,
                        user_prenom:res.data.user.prenom,
                        date_derniere_operation:res.data.date_derniere_operation,
                        derniere_operation:res.data.derniere_operation
                    }
                    this.store.dispatch(getLogs({logs:logs}))     
                    return PutAffectationSuccess({affectation:AffectationModel})
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    return of(putModelFailure({putError:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    
    putEmployeRubrique$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(PutEmployeRubriqueStart),
            concatMap(
                (action)=> this.employeService.putEmployeRubrique(action)
                .pipe(
                    map((res):any=>{
                        this.store.dispatch(getEmployeStart({id:res.data.employe}))
                        return PutEmployeRubriqueSuccess()
                    }),
                    catchError((error):any=>{
                        const errorMessage = this.errorHandler.handleError(error)
                        console.log(error)
                        return of(putModelFailure({putError:errorMessage}))
                    }
                    ) 
                )
            ),
        )
    )

    deleteEmployeRubrique$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(DeleteEmployeRubriqueStart),
            mergeMap(
                (action)=> this.employeService.deleteEmployeRubrique(action)
                .pipe(
                    map((res):any=>{
                        this.store.dispatch(getEmployeStart({id:res.data.employe}))
                        return DeleteEmployeRubriqueSuccess()
                    }),
                    catchError((error):any=>{
                        const errorMessage = this.errorHandler.handleError(error)
                        console.log(error)
                        return of(putModelFailure({putError:errorMessage}))
                    }
                    ) 
                )
            ),
        )
    )

    putFormuleVariable$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(PutFormuleVariableStart),
            concatMap(
                (action)=> this.formuleService.putFormuleVariable(action)
                .pipe(
                    map((res):any=>{
                        this.store.dispatch(getFormuleStart({id:res.data.formule}))
                        return PutFormuleVariableSuccess()
                    }),
                    catchError((error):any=>{
                        const errorMessage = this.errorHandler.handleError(error)
                        console.log(error)
                        return of(putModelFailure({putError:errorMessage}))
                    }
                    ) 
                )
            ),
        )
    )

    deleteFormuleVariable$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(DeleteFormuleVariableStart),
            mergeMap(
                (action)=> this.formuleService.deleteFormuleVariable(action)
                .pipe(
                    map((res):any=>{
                        return DeleteFormuleVariableSuccess()
                    }),
                    catchError((error):any=>{
                        const errorMessage = this.errorHandler.handleError(error)
                        console.log(error)
                        return of(putModelFailure({putError:errorMessage}))
                    }
                    ) 
                )
            ),
        )
    )

    getVariable$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(getVariableStart),
            exhaustMap(
                (action)=> this.variableService.getVariable(action)
                .pipe(
                    map((res):any=>{
                        const variableModel=this.variableBuilder.buildVariables([res.data])![0]
                        const logs:Logs={
                            user_nom:res.data.user.nom,
                            user_prenom:res.data.user.prenom,
                            date_derniere_operation:res.data.date_derniere_operation,
                            derniere_operation:res.data.derniere_operation
                        }
                        this.store.dispatch(getLogs({logs:logs}))
                        this.store.dispatch(getMetadata({metadata:res.metadata}))
                        return getVariableSuccess({variable:variableModel})
                    }),
                    catchError((error):any=>{
                        const errorMessage = this.errorHandler.handleError(error)
                        console.log(error)
                        return of(getModelFailure({error:errorMessage}))
                    }
                    ) 
                )
            ),
        )
    )


    getFormule$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(getFormuleStart),
            exhaustMap(
                (action)=> this.formuleService.getFormule(action)
                .pipe(
                    map((res):any=>{
                        const formuleModel=this.formuleBuilder.buildFormules([res.data],true)![0]
                        const logs:Logs={
                            user_nom:res.data.user.nom,
                            user_prenom:res.data.user.prenom,
                            date_derniere_operation:res.data.date_derniere_operation,
                            derniere_operation:res.data.derniere_operation
                        }
                        this.store.dispatch(getLogs({logs:logs}))
                        this.store.dispatch(getMetadata({metadata:res.metadata}))
                        return getFormuleSuccess({formule:formuleModel})
                    }),
                    catchError((error):any=>{
                        const errorMessage = this.errorHandler.handleError(error)
                        console.log(error)
                        return of(getModelFailure({error:errorMessage}))
                    }
                    ) 
                )
            ),
        )
    )


    getAffectation$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(getAffectationStart),
            exhaustMap(
                (action)=> this.affectationService.getAffectation(action)
                .pipe(
                    map((res):any=>{
                        const affectationModel=this.affectationBuilder.buildAffectations([res.data])![0]
                        const logs:Logs={
                            user_nom:res.data.user.nom,
                            user_prenom:res.data.user.prenom,
                            date_derniere_operation:res.data.date_derniere_operation,
                            derniere_operation:res.data.derniere_operation
                        }
                        this.store.dispatch(getLogs({logs:logs}))
                        this.store.dispatch(getMetadata({metadata:res.metadata}))
                        return getAffectationSuccess({affectation:affectationModel})
                    }),
                    catchError((error):any=>{
                        const errorMessage = this.errorHandler.handleError(error)
                        console.log(error)
                        return of(getModelFailure({error:errorMessage}))
                    }
                    ) 
                )
            ),
        )
    )

    getCentreCout$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(getCentreCoutStart),
            exhaustMap(
                (action)=> this.centreCoutService.getCentreCout(action)
                .pipe(
                    map((res):any=>{
                        const centreCoutModel=this.centreCoutBuilder.buildCentresCout([res.data])![0]
                        const logs:Logs={
                            user_nom:res.data.user.nom,
                            user_prenom:res.data.user.prenom,
                            date_derniere_operation:res.data.date_derniere_operation,
                            derniere_operation:res.data.derniere_operation
                        }
                        this.store.dispatch(getLogs({logs:logs}))
                        this.store.dispatch(getMetadata({metadata:res.metadata}))
                        return getCentreCoutSuccess({centreCout:centreCoutModel})
                    }),
                    catchError((error):any=>{
                        const errorMessage = this.errorHandler.handleError(error)
                        console.log(error)
                        return of(getModelFailure({error:errorMessage}))
                    }
                    ) 
                )
            ),
        )
    )

    getContrat$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(getContratStart),
            exhaustMap(
                (action)=> this.contratService.getContrat(action)
                .pipe(
                    map((res):any=>{
                        const contratModel=this.contratBuilder.buildContrats([res.data])![0]
                        const logs:Logs={
                            user_nom:res.data.user.nom,
                            user_prenom:res.data.user.prenom,
                            date_derniere_operation:res.data.date_derniere_operation,
                            derniere_operation:res.data.derniere_operation
                        }
                        this.store.dispatch(getLogs({logs:logs}))
                        this.store.dispatch(getMetadata({metadata:res.metadata}))
                        return getContratSuccess({contrat:contratModel})
                    }),
                    catchError((error):any=>{
                        const errorMessage = this.errorHandler.handleError(error)
                        console.log(error)
                        return of(getModelFailure({error:errorMessage}))
                    }
                    ) 
                )
            ),
        )
    )

    getDirection$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(getDirectionStart),
            exhaustMap(
                (action)=> this.directionService.getDirection(action)
                .pipe(
                    map((res):any=>{
                        const directionModel=this.directionBuilder.buildDirections([res.data])![0]
                        const logs:Logs={
                            user_nom:res.data.user.nom,
                            user_prenom:res.data.user.prenom,
                            date_derniere_operation:res.data.date_derniere_operation,
                            derniere_operation:res.data.derniere_operation
                        }
                        this.store.dispatch(getLogs({logs:logs}))
                        this.store.dispatch(getMetadata({metadata:res.metadata}))
                        return getDirectionSuccess({direction:directionModel})
                    }),
                    catchError((error):any=>{
                        const errorMessage = this.errorHandler.handleError(error)
                        console.log(error)
                        return of(getModelFailure({error:errorMessage}))
                    }
                    ) 
                )
            ),
        )
    )

    getEntite$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(getEntiteStart),
            exhaustMap(
                (action)=> this.entiteService.getEntite(action)
                .pipe(
                    map((res):any=>{
                        const entiteModel=this.entiteBuilder.buildEntites([res.data])![0]
                        const logs:Logs={
                            user_nom:res.data.user.nom,
                            user_prenom:res.data.user.prenom,
                            date_derniere_operation:res.data.date_derniere_operation,
                            derniere_operation:res.data.derniere_operation
                        }
                        this.store.dispatch(getLogs({logs:logs}))
                        this.store.dispatch(getMetadata({metadata:res.metadata}))
                        return getEntiteSuccess({entite:entiteModel})
                    }),
                    catchError((error):any=>{
                        const errorMessage = this.errorHandler.handleError(error)
                        console.log(error)
                        return of(getModelFailure({error:errorMessage}))
                    }
                    ) 
                )
            ),
        )
    )

    getFonction$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(getFonctionStart),
            exhaustMap(
                (action)=> this.fonctionService.getFonction(action)
                .pipe(
                    map((res):any=>{
                        const fonctionModel=this.fonctionBuilder.buildFonctions([res.data])![0]
                        const logs:Logs={
                            user_nom:res.data.user.nom,
                            user_prenom:res.data.user.prenom,
                            date_derniere_operation:res.data.date_derniere_operation,
                            derniere_operation:res.data.derniere_operation
                        }
                        this.store.dispatch(getLogs({logs:logs}))
                        this.store.dispatch(getMetadata({metadata:res.metadata}))
                        return getFonctionSuccess({fonction:fonctionModel})
                    }),
                    catchError((error):any=>{
                        const errorMessage = this.errorHandler.handleError(error)
                        console.log(error)
                        return of(getModelFailure({error:errorMessage}))
                    }
                    ) 
                )
            ),
        )
    )

    getRubrique$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(getRubriqueStart),
            exhaustMap(
                (action)=> this.rubriqueService.getRubrique(action)
                .pipe(
                    map((res):any=>{
                        const rubriqueModel=this.rubriqueBuilder.buildRubriques([res.data])![0]
                        const logs:Logs={
                            user_nom:res.data.user.nom,
                            user_prenom:res.data.user.prenom,
                            date_derniere_operation:res.data.date_derniere_operation,
                            derniere_operation:res.data.derniere_operation
                        }
                        this.store.dispatch(getLogs({logs:logs}))
                        this.store.dispatch(getMetadata({metadata:res.metadata}))
                        return getRubriqueSuccess({rubrique:rubriqueModel})
                    }),
                    catchError((error):any=>{
                        const errorMessage = this.errorHandler.handleError(error)
                        console.log(error)
                        return of(getModelFailure({error:errorMessage}))
                    }
                    ) 
                )
            ),
        )
    )

    getEmploye$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(getEmployeStart),
            exhaustMap(
                (action)=> this.employeService.getEmploye(action)
                .pipe(
                    map((res):any=>{
                        const employeModel=this.employeBuilder.buildEmployes([res.data],true)![0]
                        const logs:Logs={
                            user_nom:res.data.user.nom,
                            user_prenom:res.data.user.prenom,
                            date_derniere_operation:res.data.date_derniere_operation,
                            derniere_operation:res.data.derniere_operation
                        }
                        this.store.dispatch(getLogs({logs:logs}))
                        this.store.dispatch(getMetadata({metadata:res.metadata}))
                        return getEmployeSuccess({employe:employeModel})
                    }),
                    catchError((error):any=>{
                        const errorMessage = this.errorHandler.handleError(error)
                        console.log(error)
                        return of(getModelFailure({error:errorMessage}))
                    }
                    ) 
                )
            ),
        )
    )
    
    constructor(
        private actions$: Actions,
        private errorHandler:ErrorHandlerService,
        private store:Store<AppState>,

        private fonctionService: FonctionService,
        private contratService: ContratService,
        private directionService: DirectionService,
        private entiteService: EntiteService,
        private villeService: VilleService,
        private centreCoutService: CentreCoutService,
        private affectationService: AffectationService,
        private employeService: EmployeService,
        private rubriqueService: RubriqueService,
        private formuleService: FormuleService,
        private variableService: VariableService,

        
        private fonctionBuilder:FonctionBuilderService,
        private villeBuilder:VilleBuilderService,
        private entiteBuilder:EntiteBuilderService,
        private directionBuilder:DirectionBuilderService,
        private contratBuilder:ContratBuilderService,
        private centreCoutBuilder:CentreCoutBuilderService,
        private affectationBuilder:AffectationBuilderService,
        private employeBuilder:EmployeBuilderService,
        private rubriqueBuilder:RubriqueBuilderService,
        private formuleBuilder:FormuleBuilderService,
        private variableBuilder:VariableBuilderService,
        ){}
}