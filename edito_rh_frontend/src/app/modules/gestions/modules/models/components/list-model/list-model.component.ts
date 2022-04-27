import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { getMetadataSelector } from 'src/app/modules/gestions/state/gestion.selectors';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-list-model',
  templateUrl: './list-model.component.html',
  styleUrls: ['./list-model.component.scss']
})
export class ListModelComponent implements OnInit {

  @Input()
  modelData$?:Observable<any>;
  metadata$!:Observable<any>
  ngOnInit(): void {
    this.metadata$=this.store.pipe(
      select(getMetadataSelector),
      filter( val=> val !== undefined),
      map((metadata)=> {
        return metadata
      })
    )
  }

  goToModel(label:string,id:string){
    this.router.navigate([`/gestion/${label}/${id}/`])
  }
  constructor(
    private store:Store<AppState>,
    private router:Router,
  ) { }
}
