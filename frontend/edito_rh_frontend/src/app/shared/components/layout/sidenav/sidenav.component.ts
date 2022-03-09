import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getSideNavItems } from '../state/layout.selector';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  sideNavItems$!:Observable<string[]>
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.sideNavItems$= this.store.select(getSideNavItems)
  }
 

}
