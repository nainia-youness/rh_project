import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FonctionModel } from 'src/app/shared/models/fonction.model';
import { filter,map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { gestionPageSelector, getEntitiesSuccessSelector, getFonctionsSuccessSelector, getMetadataSelector } from '../../state/gestion.selectors';
import { Observable } from 'rxjs';
import { GestionService } from '../../services/gestion.service';
import { gestionPageChange } from '../../state/gestion.actions';
import { GestionPage } from '../../state/gestion.state';


@Component({
  selector: 'app-gestion-template',
  templateUrl: './gestion-template.component.html',
  styleUrls: ['./gestion-template.component.scss']
})
export class GestionTemplateComponent implements OnInit {


  dataSource$?:Observable<FonctionModel[] | undefined>;
  metadata$!:Observable<any>
  gestionPage$!:Observable<string>
  columns:any[]=[]
  displayedColumns:any
  selectedFilter:string=""

  ngOnInit(): void {

    this.gestionPage$=this.store.pipe(
      select(gestionPageSelector),
      map((gestionPage)=> {
        this.columns=this.gestionService.getColumns(gestionPage)
        this.displayedColumns = this.columns.map(c => c.columnDef);
        this.getDataSource(gestionPage)
        return gestionPage
      })
    )

    this.metadata$=this.store.pipe(
      select(getMetadataSelector),
      filter( val=> val !== undefined),
      map((metadata)=> {
        return metadata
      })
    )
  }

  getDataSource=(gestionPage:string)=>{
    this.getFonctions(gestionPage)
  }


  getFonctions=(gestionPage:string)=>{
    this.dataSource$=this.store.pipe(
      filter( ()=> gestionPage===GestionPage.FONCTIONS),
      select(getEntitiesSuccessSelector),
      filter( val=> val !== undefined),
      map((fonctions)=> fonctions)
    )
  }

  create=()=>{
    console.log("create")
  }

  export=()=>{
    console.log("export")
  }

  export_all=()=>{
    console.log("export all")
  }




  constructor(
    private store:Store<AppState>,
    private gestionService:GestionService,
    ) { }
}
