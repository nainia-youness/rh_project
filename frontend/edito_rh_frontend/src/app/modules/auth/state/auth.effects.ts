import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType} from "@ngrx/effects";
import { exhaustMap, map, Observable,concatMap,switchMap, of } from "rxjs";
import { AuthService } from "src/app/core/services/http/auth.service";
import { loginFailure, loginStart, loginSuccess } from "./auth.actions";
import {catchError} from 'rxjs/operators'; 



@Injectable()
export class AuthEffects{


    login$:any=createEffect(():any=> //create effect
            this.actions$.pipe(
                ofType(loginStart),//specify the action you are listening to
                switchMap(
                    (action)=> this.authService.login(action.email,action.password)//when the action is lunched, execute service
                    .pipe(
                        map((authResponse):any=>loginSuccess({authResponse})),//if successful
                        catchError((error):any=>of(loginFailure({error}))) //if failure
                    )
                ),
            )
    )

    constructor(private actions$: Actions,private authService: AuthService){}
}