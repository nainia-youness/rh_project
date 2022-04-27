import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType} from "@ngrx/effects";
import { exhaustMap, map, of } from "rxjs";
import {catchError} from 'rxjs/operators'; 
import { Store,select } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { getFormuleStart, getFormuleSuccess, getModelFailure, getVariableStart, getVariableSuccess, getVilleStart, getVilleSuccess } from "./model.actions";
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
    constructor(
        private actions$: Actions,
        private errorHandler:ErrorHandlerService,
        private villeService:VilleService,
        private variableService:VariableService,
        private formuleService:FormuleService,
        private store:Store<AppState>,
        private villeBuilder:VilleBuilderService,
        private formuleBuilder:FormuleBuilderService,
        private variableBuilder:VariableBuilderService,
        ){}
}