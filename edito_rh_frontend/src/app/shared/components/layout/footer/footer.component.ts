import { Component, OnInit } from '@angular/core';
import { Store,select } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Logs } from '../state/layout.interface';
import { getLogsSelector, getShowFooter } from '../state/layout.selector';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  showFooter$!:Observable<boolean>
  logs$!:Observable<Logs | undefined>
  constructor( private store:Store<AppState>) { }

  ngOnInit(): void {
    this.showFooter$= this.store.select(getShowFooter)
    this.logs$= this.store.pipe(
      select(getLogsSelector),
      filter( val=> val!==undefined),
      map((logs)=>logs)
    )    
  }
}
