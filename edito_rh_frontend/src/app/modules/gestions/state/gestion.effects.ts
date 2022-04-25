import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType} from "@ngrx/effects";
import { exhaustMap, map, of } from "rxjs";
import {catchError} from 'rxjs/operators'; 
import { ErrorHandlerService } from "src/app/core/services/error/error-handler.service";
import {  getAffectationsStart, getAffectationsSuccess, getCentresCoutStart, getCentresCoutSuccess, getContratsStart, getContratsSuccess, getDirectionsStart, getDirectionsSuccess, getEmployesStart, getEmployesSuccess, getEntitesStart, getEntitesSuccess, getFonctionsStart, getFonctionsSuccess, getFormulesStart, getFormulesSuccess, getMetadata, getModelsFailure, getRubriquesStart, getRubriquesSuccess, getVariablesStart, getVariablesSuccess, getVillesStart, getVillesSuccess, pageChange } from "./gestion.actions";
import { FonctionService } from "src/app/core/services/http/fonctions/fonction.service";
import { FonctionBuilderService } from "src/app/core/services/utils/builders/fonction_builder/fonction-builder.service";
import { Store,select } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { ChangeDetectionStrategy } from "@angular/compiler";
import { pageSelector } from "./gestion.selectors";
import { Page } from "./gestion.state";
import { GridRowStyleBuilder } from "@angular/flex-layout";
import { getLogs } from "src/app/shared/components/layout/state/layout.actions";
import { Logs } from "src/app/shared/components/layout/state/layout.interface";
import { CentreCoutService } from "src/app/core/services/http/centres_cout/centre-cout.service";
import { ContratService } from "src/app/core/services/http/contrats/contrat.service";
import { DirectionService } from "src/app/core/services/http/directions/direction.service";
import { EntiteService } from "src/app/core/services/http/entites/entite.service";
import { VilleService } from "src/app/core/services/http/villes/ville.service";
import { VilleBuilderService } from "src/app/core/services/utils/builders/ville_builder/ville-builder.service";
import { EntiteBuilderService } from "src/app/core/services/utils/builders/entite_builder/entite-builder.service";
import { DirectionBuilderService } from "src/app/core/services/utils/builders/direction_builder/direction-builder.service";
import { ContratBuilderService } from "src/app/core/services/utils/builders/contrat_builder/contrat-builder.service";
import { CentreCoutBuilderService } from "src/app/core/services/utils/builders/centre_cout_builder/centre-cout-builder.service";
import { AffectationService } from "src/app/core/services/http/affectations/affectation.service";
import { EmployeService } from "src/app/core/services/http/employes/employe.service";
import { EmployeBuilderService } from "src/app/core/services/utils/builders/employe_builder/employe-builder.service";
import { AffectationBuilderService } from "src/app/core/services/utils/builders/affectation_builder/affectation-builder.service";
import { RubriqueService } from "src/app/core/services/http/rubriques/rubrique.service";
import { FormuleService } from "src/app/core/services/http/formules/formule.service";
import { VariableService } from "src/app/core/services/http/variables/variable.service";
import { RubriqueBuilderService } from "src/app/core/services/utils/builders/rubrique_builder/rubrique-builder.service";
import { FormuleBuilderService } from "src/app/core/services/utils/builders/formule_builder/formule-builder.service";
import { VariableBuilderService } from "src/app/core/services/utils/builders/variable_builder/variable-builder.service";



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
                            //for single model
                            /*const logs:Logs={
                                user_nom:res.data.user.nom,
                                user_prenom:res.data.user.prenom,
                                date_derniere_operation:res.data.date_derniere_operation,
                                derniere_operation:res.data.derniere_operation
                            }
                            this.store.dispatch(getLogs({logs:logs}))*/
                            this.store.dispatch(getMetadata({metadata:res.metadata}))

                            this.changePage(res)

                            return getFonctionsSuccess({fonctions:fonctionsModels})
                        }),
                        catchError((error):any=>{
                            const errorMessage = this.errorHandler.handleError(error)
                            console.log(error)
                            //error.error.message
                            return of(getModelsFailure({error:errorMessage}))
                        }
                        ) 
                    )
                ),
            )
    )
    
    getVilles$:any=createEffect(():any=>
            this.actions$.pipe(
                ofType(getVillesStart),
                exhaustMap(
                    ()=> this.villeService.getVilles()
                    .pipe(
                        map((res):any=>{
                            const villesModels=this.villeBuilder.buildVilles(res.data)

                            this.store.dispatch(getMetadata({metadata:res.metadata}))

                            this.changePage(res)

                            return getVillesSuccess({villes:villesModels})
                        }),
                        catchError((error):any=>{
                            const errorMessage = this.errorHandler.handleError(error)
                            console.log(error)
                            //error.error.message
                            return of(getModelsFailure({error:errorMessage}))
                        }
                        ) 
                    )
                ),
            )
    )
    
    getRubriques$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(getRubriquesStart),
            exhaustMap(
                ()=> this.rubriqueService.getRubriques()
                .pipe(
                    map((res):any=>{
                        const rubriquesModels=this.rubriqueBuilder.buildRubriques(res.data)

                        this.store.dispatch(getMetadata({metadata:res.metadata}))

                        this.changePage(res)

                        return getRubriquesSuccess({rubriques:rubriquesModels})
                    }),
                    catchError((error):any=>{
                        const errorMessage = this.errorHandler.handleError(error)
                        console.log(error)
                        //error.error.message
                        return of(getModelsFailure({error:errorMessage}))
                    }
                    ) 
                )
            ),
        )
    )

    getFormules$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(getFormulesStart),
            exhaustMap(
                ()=> this.formuleService.getFormules()
                .pipe(
                    map((res):any=>{
                        const formulesModels=this.formuleBuilder.buildFormules(res.data)

                        this.store.dispatch(getMetadata({metadata:res.metadata}))

                        this.changePage(res)

                        return getFormulesSuccess({formules:formulesModels})
                    }),
                    catchError((error):any=>{
                        const errorMessage = this.errorHandler.handleError(error)
                        console.log(error)
                        //error.error.message
                        return of(getModelsFailure({error:errorMessage}))
                    }
                    ) 
                )
            ),
        )
    )

    getVariables$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(getVariablesStart),
            exhaustMap(
                ()=> this.variableService.getVariables()
                .pipe(
                    map((res):any=>{
                        const variablesModels=this.variableBuilder.buildVariables(res.data)

                        this.store.dispatch(getMetadata({metadata:res.metadata}))

                        this.changePage(res)

                        return getVariablesSuccess({variables:variablesModels})
                    }),
                    catchError((error):any=>{
                        const errorMessage = this.errorHandler.handleError(error)
                        console.log(error)
                        //error.error.message
                        return of(getModelsFailure({error:errorMessage}))
                    }
                    ) 
                )
            ),
        )
    )

    getEntites$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(getEntitesStart),
            exhaustMap(
                ()=> this.entiteService.getEntites()
                .pipe(
                    map((res):any=>{
                        const entitesModels=this.entiteBuilder.buildEntites(res.data)

                        this.store.dispatch(getMetadata({metadata:res.metadata}))

                        this.changePage(res)

                        return getEntitesSuccess({entites:entitesModels})
                    }),
                    catchError((error):any=>{
                        const errorMessage = this.errorHandler.handleError(error)
                        console.log(error)
                        //error.error.message
                        return of(getModelsFailure({error:errorMessage}))
                    }
                    ) 
                )
            ),
        )
    )

    getDirections$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(getDirectionsStart),
            exhaustMap(
                ()=> this.directionService.getDirections()
                .pipe(
                    map((res):any=>{
                        const directionsModels=this.directionBuilder.buildDirections(res.data)

                        this.store.dispatch(getMetadata({metadata:res.metadata}))

                        this.changePage(res)

                        return getDirectionsSuccess({directions:directionsModels})
                    }),
                    catchError((error):any=>{
                        const errorMessage = this.errorHandler.handleError(error)
                        console.log(error)
                        //error.error.message
                        return of(getModelsFailure({error:errorMessage}))
                    }
                    ) 
                )
            ),
        )
    )

    getContrats$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(getContratsStart),
            exhaustMap(
                ()=> this.contratService.getContrats()
                .pipe(
                    map((res):any=>{
                        const contratsModels=this.contratBuilder.buildContrats(res.data)

                        this.store.dispatch(getMetadata({metadata:res.metadata}))

                        this.changePage(res)

                        return getContratsSuccess({contrats:contratsModels})
                    }),
                    catchError((error):any=>{
                        const errorMessage = this.errorHandler.handleError(error)
                        console.log(error)
                        //error.error.message
                        return of(getModelsFailure({error:errorMessage}))
                    }
                    ) 
                )
            ),
        )
    )

    
    getCentresCout$:any=createEffect(():any=>
        this.actions$.pipe(
            ofType(getCentresCoutStart),
            exhaustMap(
                ()=> this.centreCoutService.getCentresCout()
                .pipe(
                    map((res):any=>{
                        const centresCoutModels=this.centreCoutBuilder.buildCentresCout(res.data)

                        this.store.dispatch(getMetadata({metadata:res.metadata}))

                        this.changePage(res)

                        return getCentresCoutSuccess({centres_cout:centresCoutModels})
                    }),
                    catchError((error):any=>{
                        const errorMessage = this.errorHandler.handleError(error)
                        console.log(error)
                        //error.error.message
                        return of(getModelsFailure({error:errorMessage}))
                    }
                    ) 
                )
            ),
        )
    )

    getAffectations$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(getAffectationsStart),
        exhaustMap(
            ()=> this.affectationService.getAffectations()
            .pipe(
                map((res):any=>{
                    const affectationsModels=this.affectationBuilder.buildAffectations(res.data)

                    this.store.dispatch(getMetadata({metadata:res.metadata}))

                    this.changePage(res)

                    return getAffectationsSuccess({affectations:affectationsModels})
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    //error.error.message
                    return of(getModelsFailure({error:errorMessage}))
                }
                ) 
            )
        ),
    ))

    getEmployes$:any=createEffect(():any=>
    this.actions$.pipe(
        ofType(getEmployesStart),
        exhaustMap(
            ()=> this.employeService.getEmployes()
            .pipe(
                map((res):any=>{
                    const employesModels=this.employeBuilder.buildEmployes(res.data)

                    this.store.dispatch(getMetadata({metadata:res.metadata}))

                    this.changePage(res)

                    return getEmployesSuccess({employes:employesModels})
                }),
                catchError((error):any=>{
                    const errorMessage = this.errorHandler.handleError(error)
                    console.log(error)
                    //error.error.message
                    return of(getModelsFailure({error:errorMessage}))
                }
                ) 
            )
        ),
    ))

    private changePage(res:any){
        let result!:Page
        let nbrRowsInCurrentPage!:number
        this.store.pipe(
            select(pageSelector),
            map((page:Page)=> {
              result=page
              nbrRowsInCurrentPage=res.data.length
              return page
            })
        ).subscribe()
        const deepCopy=JSON.parse(JSON.stringify(result))
        //change te rowsPerPage if the number of rows is < to what it s supposed to be
        
        if(nbrRowsInCurrentPage) deepCopy.nbrRowsInCurrentPage=nbrRowsInCurrentPage
        deepCopy.maxPages=res.metadata.max_pages
        deepCopy.count=res.metadata.count
        this.store.dispatch(pageChange({page:deepCopy}))
    }

    constructor(
        private actions$: Actions,
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

        private errorHandler:ErrorHandlerService,
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
        private store:Store<AppState>
        ){}
}