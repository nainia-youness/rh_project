import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FonctionModel } from 'src/app/shared/models/fonction.model';
import { filter,map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { gestionPageSelector, getEntitiesSuccessSelector, getFonctionsSuccessSelector, getMetadataSelector, pageSelector } from '../../state/gestion.selectors';
import { Observable } from 'rxjs';
import { GestionService } from '../../services/gestion.service';
import { gestionPageChange, getFonctionsStart, pageChange } from '../../state/gestion.actions';
import { GestionPage, Page } from '../../state/gestion.state';
import { MatPaginator } from '@angular/material/paginator';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-gestion-template',
  templateUrl: './gestion-template.component.html',
  styleUrls: ['./gestion-template.component.scss']
})
export class GestionTemplateComponent implements OnInit {
  
  @Input()
  dataSource$?:Observable<FonctionModel[] | undefined>;
  metadata$!:Observable<any>
  page$!:Observable<Page>
  gestionPage$!:Observable<string>
  columns:any[]=[]
  displayedColumns:any
  selectedFilter:string=""
  pageEvent!: PageEvent;
  ngOnInit(): void {



    this.gestionPage$=this.store.pipe(
      select(gestionPageSelector),
      map((gestionPage)=> {
        this.columns=this.gestionService.getColumns(gestionPage)
        this.displayedColumns = this.columns.map(c => c.columnDef);
        return gestionPage
      })
    )

    
    this.page$=this.store.pipe(
      select(pageSelector),
      filter( val=> val !== undefined),
      map((page)=> {
        return page
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

  @Input() filterApiCall!: () => void;

  create=()=>{
    console.log("create")
  }

  export=()=>{
    console.log("export")
  }

  export_all=()=>{
    console.log("export all")
  }

  goToNextPage=($event:any)=>{
    
      let result!:Page
      this.store.pipe(
          select(pageSelector),
          map((page:Page)=> {
            result=page
            return page
          })
      ).subscribe()
      const deepCopy=JSON.parse(JSON.stringify(result))
      deepCopy.currentPage=$event.pageIndex+1
      this.store.dispatch(pageChange({page:deepCopy}))
      this.store.dispatch(getFonctionsStart())
  }


  constructor(
    private store:Store<AppState>,
    private gestionService:GestionService,
    ) { }
}
