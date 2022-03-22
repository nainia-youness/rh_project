import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType} from "@ngrx/effects";
import { exhaustMap, map, of } from "rxjs";
import {catchError} from 'rxjs/operators'; 
import { ErrorHandlerService } from "src/app/core/services/error/error-handler.service";
import { getFonctionsFailure, getFonctionsStart, getFonctionsSuccess } from "./gestion.actions";
import { FonctionService } from "src/app/core/services/http/fonctions/fonction.service";
import { FonctionBuilderService } from "src/app/core/services/utils/builders/fonction_builder/fonction-builder.service";



@Injectable()
export class GestionsEffects{

    getFonctions$:any=createEffect(():any=>
            this.actions$.pipe(
                ofType(getFonctionsStart),
                exhaustMap(
                    ()=> this.fonctionService.getFonctions()
                    .pipe(
                        map((fonctions):any=>{

                            const fonctionsModels=this.fonctionBuilder.buildFonctions(fonctions)

                            return getFonctionsSuccess({fonctions:fonctionsModels})
                        }),
                        catchError((error):any=>{
                            //const errorMessage = this.errorHandler.getAuthErrorMessage(error)
                            console.log(error)
                            return of(getFonctionsFailure({error:error.error.message}))
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
        private fonctionBuilder:FonctionBuilderService
        ){}
}