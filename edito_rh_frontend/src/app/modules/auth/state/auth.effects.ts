import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType} from "@ngrx/effects";
import { exhaustMap, map, Observable,concatMap,switchMap, of } from "rxjs";

import { getAccessTokenStart, getAccessTokenSuccess, getUserFailure, getUserStart, getUserSuccess, loginFailure, loginStart, loginSuccess } from "./auth.actions";
import {catchError} from 'rxjs/operators'; 
import { ErrorHandlerService } from "src/app/core/services/error/error-handler.service";
import { AuthService } from "src/app/core/services/http/auth/auth.service";
import { UserBuilderService } from "src/app/core/services/utils/builders/user_builder/user-builder.service";
import { StorageService } from "src/app/core/services/storage/storage.service";



@Injectable()
export class AuthEffects{


    login$:any=createEffect(():any=> //create effect
            this.actions$.pipe(
                ofType(loginStart),//specify the action you are listening to
                concatMap(
                    (action)=> this.authService.login(action.email,action.password)//when the action is lunched, execute service
                    .pipe(
                        map((res):any=>{//if successful            
                            return loginSuccess({loginResponse:res.body})
                        }),
                        catchError((error):any=>{//if failure
                            console.log(error)
                            const errorMessage = this.errorHandler.handleError(error)
                            return of(loginFailure({error:errorMessage}))
                        }
                        ) 
                    )
                ),
            )
    )

    getUser$:any=createEffect(():any=> //create effect
    this.actions$.pipe(
        ofType(getUserStart),//specify the action you are listening to
        concatMap(
            (action)=> this.authService.getUser()//when the action is lunched, execute service
            .pipe(
                map((res):any=>{//if successful
                    const user=this.userBuilder.fromResponse(res.data)
                    this.storageService.setItem('user',user)
                    return getUserSuccess({user:user})
                }),
                catchError((error):any=>{//if failure
                    console.log(error)
                    const errorMessage = this.errorHandler.handleError(error)
                    return of(getUserFailure({error:errorMessage}))
                }
                ) 
            )
        ),
    )
    )

    getAccessToken$:any=createEffect(():any=> //create effect
    this.actions$.pipe(
        ofType(getAccessTokenStart),//specify the action you are listening to
        concatMap(
            (action)=> this.authService.getNewAccessToken(action.access_token,action.refresh_token)//when the action is lunched, execute service
            .pipe(
                map((res):any=>{//if successful
                    this.storageService.setItem('access_token',res.token)
                    return getAccessTokenSuccess({accessToken:res.token})
                }),
                catchError((error):any=>{//if failure
                    console.log(error)
                    const errorMessage = this.errorHandler.handleError(error)
                    return of(getUserFailure({error:errorMessage}))
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
        private userBuilder:UserBuilderService,
        private storageService:StorageService,
        ){}
}