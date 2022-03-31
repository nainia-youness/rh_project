import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType} from "@ngrx/effects";
import { exhaustMap, map, of } from "rxjs";
import {catchError} from 'rxjs/operators'; 
import { ErrorHandlerService } from "src/app/core/services/error/error-handler.service";
import { getFonctionsFailure, getFonctionsStart, getFonctionsSuccess, getMetadata, pageChange } from "./gestion.actions";
import { FonctionService } from "src/app/core/services/http/fonctions/fonction.service";
import { FonctionBuilderService } from "src/app/core/services/utils/builders/fonction_builder/fonction-builder.service";
import { Store,select } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { ChangeDetectionStrategy } from "@angular/compiler";
import { pageSelector } from "./gestion.selectors";
import { Page } from "./gestion.state";
import { GridRowStyleBuilder } from "@angular/flex-layout";



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

                            this.changePage(res)

                            return getFonctionsSuccess({fonctions:fonctionsModels})
                        }),
                        catchError((error):any=>{
                            const errorMessage = this.errorHandler.handleError(error)
                            console.log(error)
                            //error.error.message
                            return of(getFonctionsFailure({error:errorMessage}))
                        }
                        ) 
                    )
                ),
            )
    )
    
    private changePage(res:any){
        let result!:Page
        let rowsPerPage!:number
        this.store.pipe(
            select(pageSelector),
            map((page:Page)=> {
              result=page
              if(page.rowsPerPage && res.data){
                if(res.data.length<page.rowsPerPage){
                    rowsPerPage=res.data.length
                }
              }
              return page
            })
        ).subscribe()
        const deepCopy=JSON.parse(JSON.stringify(result))
        //change te rowsPerPage if the number of rows is < to what it s supposed to be
        if(rowsPerPage) deepCopy.rowsPerPage=rowsPerPage
        deepCopy.maxPages=res.maxPages
        this.store.dispatch(pageChange({page:deepCopy}))
    }

    constructor(
        private actions$: Actions,
        private fonctionService: FonctionService,
        private errorHandler:ErrorHandlerService,
        private fonctionBuilder:FonctionBuilderService,
        private store:Store<AppState>
        ){}
}