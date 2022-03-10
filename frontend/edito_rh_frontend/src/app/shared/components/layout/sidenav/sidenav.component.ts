import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';

import { getSideNavItems } from '../state/layout.selector';

import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '../services/side-nav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit { 

  sideNavItems$!:Observable<string[]>
  @ViewChild('sidenav') sidenav!:MatSidenav;


  constructor(private store: Store<AppState>,private sidenavService: SidenavService) { }
  
  ngOnInit(): void {
    this.sideNavItems$= this.store.select(getSideNavItems)
  }
  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
  
  open(e: any) {
    e.toggle();
  }

  toggleSideNav(){
    this.open(this.sidenav)
  }
}
