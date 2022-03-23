import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType} from "@ngrx/effects";
import { exhaustMap, map, of } from "rxjs";
import {catchError} from 'rxjs/operators'; 
import { ErrorHandlerService } from "src/app/core/services/error/error-handler.service";
import { getFonctionsFailure, getFonctionsStart, getFonctionsSuccess, getMetadata } from "./gestion.actions";
import { FonctionService } from "src/app/core/services/http/fonctions/fonction.service";
import { FonctionBuilderService } from "src/app/core/services/utils/builders/fonction_builder/fonction-builder.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";



@Injectable()
export class GestionsEffects{

    getFonctions$:any=createEffect(():any=>
            this.actions$.pipe(
                ofType(getFonctionsStart),
                exhaustMap(
                    ()=> this.fonctionService.getFonctions()
                    .pipe(
                        map((res):any=>{
                            const fonctionsModels=this.fonctionBuilder.buildFonctions(res.data)
                            
                            this.store.dispatch(getMetadata({metadata:res.metaData}))

                            return getFonctionsSuccess({fonctions:fonctionsModels})
                        }),
                        catchError((error):any=>{
                            const errorMessage = this.errorHandler.getAuthErrorMessage(error)
                            console.log(error)
                            //error.error.message
                            return of(getFonctionsFailure({error:errorMessage}))
                        }
                        ) 
                    )
                ),
            )
    )

    constructor(
        private actions$: Actions,
        private fonctionService: FonctionService,
        private errorHandler:ErrorHandlerService,
        private fonctionBuilder:FonctionBuilderService,
        private store:Store<AppState>
        ){}
}