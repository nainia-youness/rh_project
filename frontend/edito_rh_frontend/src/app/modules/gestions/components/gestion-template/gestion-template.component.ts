import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FonctionModel } from 'src/app/shared/models/fonction.model';
import { filter,map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { gestionPageSelector, getEntitiesSuccessSelector, getFonctionsSuccessSelector } from '../../state/gestion.selectors';
import { Observable } from 'rxjs';
import { GestionService } from '../../services/gestion.service';


@Component({
  selector: 'app-gestion-template',
  templateUrl: './gestion-template.component.html',
  styleUrls: ['./gestion-template.component.scss']
})
export class GestionTemplateComponent implements OnInit {


  dataSource$?:Observable<FonctionModel[] | undefined>;
  
  gestionPage$!:Observable<string>
  columns:any[]=[]
  displayedColumns:any

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


  }

  getDataSource=(gestionPage:string)=>{
    this.dataSource$=this.store.pipe(
      filter( ()=> gestionPage==="Fonctions"),
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

  confirm=()=>{
    console.log("confirm")
  }

  goToEntity=()=>{
    console.log("i m gone")
  }

  constructor(
    private store:Store<AppState>,
    private gestionService:GestionService,
    ) { }
}
