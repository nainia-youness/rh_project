import { Component, OnInit,AfterViewInit,AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getScreenSize } from 'src/app/state/app.selector';
import { AppState } from 'src/app/store/app.state';
import { SidenavService } from '../services/side-nav.service';
import { getShowSideNav } from '../state/layout.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,AfterViewChecked {

  showMenu:boolean=false
  showSideNav$!:Observable<boolean>

  constructor(private store:Store<AppState>,
    private sidenav: SidenavService,
    private cdRef : ChangeDetectorRef,
    private router :Router
    ){ }

  ngOnInit(): void {
    this.showSideNav$= this.store.select(getShowSideNav)
  }

  openMenu=()=>{
    this.showMenu=!this.showMenu
  }

  openSideNav=()=>{
    this.sidenav.toggle();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  goToLogin=()=>{
    this.router.navigate(['/login']);
  }

}
