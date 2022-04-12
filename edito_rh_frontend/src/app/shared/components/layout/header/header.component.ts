import { Component, OnInit,AfterViewChecked, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { SidenavService } from '../services/side-nav.service';
import { getShowSideNav } from '../state/layout.selector';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { User } from 'src/app/shared/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ChooseEntiteDialogComponent } from '../choose-entite-dialog/choose-entite-dialog.component';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit,AfterViewChecked{

  showMenu:boolean=false
  showSideNav$!:Observable<boolean>
  isLoggedIn:boolean=this.storageService.isLoggedIn()
  user=this.storageService.getItem('user')

  constructor(private store:Store<AppState>,
    private sidenav: SidenavService,
    private cdRef : ChangeDetectorRef,
    private router :Router,
    private storageService:StorageService,
    private matDialog:MatDialog
    ){ }


  ngOnInit(): void {

    this.storageService.watchStorage().subscribe((data:any) => {
      if(data.key==='user'){
        this.isLoggedIn=this.storageService.isLoggedIn()
        
        this.user=this.storageService.getItem('user')
      }
    })
    this.showSideNav$= this.store.select(getShowSideNav)
    this.isLoggedIn=this.storageService.isLoggedIn()
  }

  openDialog(): void {
    this.matDialog.open(ChooseEntiteDialogComponent,{})
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

  onLogout=()=>{
    this.storageService.removeItem('user')
    this.storageService.clear()
    this.router.navigate(['/login']);
  }

}
