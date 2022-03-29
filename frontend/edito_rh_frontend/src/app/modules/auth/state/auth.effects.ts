import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType} from "@ngrx/effects";
import { exhaustMap, map, Observable,concatMap,switchMap, of } from "rxjs";

import { loginFailure, loginStart, loginSuccess } from "./auth.actions";
import {catchError} from 'rxjs/operators'; 
import { ErrorHandlerService } from "src/app/core/services/error/error-handler.service";
import { AuthService } from "src/app/core/services/http/auth/auth.service";
import { UserBuilderService } from "src/app/core/services/utils/builders/user_builder/user-builder.service";



@Injectable()
export class AuthEffects{


    login$:any=createEffect(():any=> //create effect
            this.actions$.pipe(
                ofType(loginStart),//specify the action you are listening to
                concatMap(
                    (action)=> this.authService.login(action.email,action.password)//when the action is lunched, execute service
                    .pipe(
                        map((authResponse):any=>{//if successful
                            const user=this.userBuilder.fromAuthResponse(authResponse!)

                            return loginSuccess({authResponse:user})
                        
                        }),
                        catchError((error):any=>{//if failure
                            const errorMessage = this.errorHandler.handleError(error)
                            return of(loginFailure({error:errorMessage}))
                        }
                        ) 
                    )
                ),
            )
    )

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private errorHandler:ErrorHandlerService,
        private userBuilder:UserBuilderService
        ){}
}