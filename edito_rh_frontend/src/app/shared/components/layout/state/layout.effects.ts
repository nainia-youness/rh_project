import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType} from "@ngrx/effects";
import { exhaustMap, map, Observable,concatMap,switchMap, of } from "rxjs";

import {catchError} from 'rxjs/operators'; 
import { ErrorHandlerService } from "src/app/core/services/error/error-handler.service";
import { FonctionService } from "src/app/core/services/http/fonctions/fonction.service";
import { GetFonctionsLogsFailure, getFonctionsLogsStart, getFonctionsLogsSuccess } from "./layout.actions";




@Injectable()
export class LayoutEffects{

  

    constructor(
        private actions$: Actions,
        private errorHandler:ErrorHandlerService,
        private fonctionService: FonctionService,
        ){}
}