import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType} from "@ngrx/effects";
import { exhaustMap, map, of } from "rxjs";
import {catchError} from 'rxjs/operators'; 
import { Store,select } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { getAffectationStart, getAffectationSuccess, getCentreCoutStart, getCentreCoutSuccess, getContratStart, getContratSuccess, getDirectionStart, getDirectionSuccess, getEmployeStart, getEntiteStart, getEntiteSuccess, getFonctionStart, getFonctionSuccess, getFormuleStart, getFormuleSuccess, getModelFailure, getRubriqueStart, getRubriqueSuccess, getVariableStart, getVariableSuccess, getVilleStart, getVilleSuccess } from "./model.actions";
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




@Injectable()
export class ModelEffects{

    getVille$:any=createEffect(():any=>
            this.actions$.pipe(
                ofType(getVilleStart),
                exhaustMap(
                    (action)=> this.villeService.getVille(action)
                    .pipe(
                        map((res):any=>{
                            const villeModel=this.villeBuilder.buildVille(res.data.id,res.data.nom)
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

    getVariable$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(getVariableStart),
            exhaustMap(
                (action)=> this.variableService.getVariable(action)
                .pipe(
                    map((res):any=>{
                        const variableModel=this.variableBuilder.buildVariable(res.data.id,res.data.designation,res.data.valeur)
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
                        const variables=this.variableBuilder.buildVariables(res.data.variables)
                        const formuleModel=this.formuleBuilder.buildFormule(res.data.id,res.data.designation,res.data.formule,variables)
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
                        const affectationModel=this.affectationBuilder.buildAffectation(res.data.id,res.data.designation,res.data.description)
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
                        const centreCoutModel=this.centreCoutBuilder.buildCentreCout(res.data.id,res.data.designation,res.data.description)
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
                        const contratModel=this.contratBuilder.buildContrat(res.data.id,res.data.designation,res.data.description)
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
                        const directionModel=this.directionBuilder.buildDirection(res.data.id,res.data.designation,res.data.description)
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
                        const entiteModel=this.entiteBuilder.buildEntite(res.data.id,res.data.designation,res.data.description)
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
                        const fonctionModel=this.fonctionBuilder.buildFonction(res.data.id,res.data.designation,res.data.description)
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
                        const rubriqueModel=this.rubriqueBuilder.buildRubrique(res.data.id,res.data.designation,res.data.description)
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
                        const rubriqueModel=this.rubriqueBuilder.buildRubrique(res.data.id,res.data.designation,res.data.description)
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