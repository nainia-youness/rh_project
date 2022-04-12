import { ChangeDetectorRef, Component, OnInit, ViewChild,AfterViewChecked} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';

import { getSideNavItems } from '../state/layout.selector';

import { MatSidenav } from '@angular/material/sidenav';
import { SideNavItem } from '../state/layout.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit,AfterViewChecked{ 

  sideNavItems$!:Observable<SideNavItem[]>
  @ViewChild('sidenav') sidenav!:MatSidenav;


  constructor(private store: Store<AppState>,private cdRef : ChangeDetectorRef,private router :Router,) { }
  
  ngOnInit(): void {
    this.sideNavItems$= this.store.select(getSideNavItems)
  }

  goToItem=(path:string)=>{
    this.router.navigate([path])
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
