import { Component, OnInit } from '@angular/core';
import { Store,select } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { getEntitiesLogsSuccessSelector } from 'src/app/modules/gestions/state/gestion.selectors';
import { Logs } from 'src/app/modules/gestions/state/gestion.state';
import { AppState } from 'src/app/store/app.state';
import { getShowFooter } from '../state/layout.selector';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  showFooter$!:Observable<boolean>
  entitiesLogs$!:Observable<Logs>
  constructor( private store:Store<AppState>) { }

  ngOnInit(): void {
    this.showFooter$= this.store.select(getShowFooter)
    this.entitiesLogs$= this.store.pipe(
      select(getEntitiesLogsSuccessSelector),
      filter( val=> val!==undefined),
      map((entitiesLogs)=>entitiesLogs)
    )    
  }
}
