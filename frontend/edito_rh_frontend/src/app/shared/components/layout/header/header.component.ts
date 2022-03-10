import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getScreenSize } from 'src/app/state/app.selector';
import { AppState } from 'src/app/store/app.state';
import { SidenavService } from '../services/side-nav.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showMenu:boolean=false
  screenSize$!: Observable<string>
  constructor(private store: Store<{screenSize:AppState}>,private sidenav: SidenavService) { }

  ngOnInit(): void {
    this.screenSize$=this.store.select(getScreenSize)
  }

  openMenu=()=>{
    this.showMenu=!this.showMenu
  }

  openSideNav=()=>{
    this.sidenav.toggle();
  }

}
