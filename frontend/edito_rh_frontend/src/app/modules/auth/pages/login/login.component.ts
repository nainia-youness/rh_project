import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { filter,map } from 'rxjs/operators';
import { AuthResponse } from 'src/app/core/services/http/auth.interface';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { LayoutState } from 'src/app/shared/components/layout/state/layout.interface';
import { User, UserModel } from 'src/app/shared/models/user.model';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';
import {loginStart} from '../../state/auth.actions';
import {getLoginFailure, getLoginSuccess } from '../../state/auth.selector';
import { select } from '@ngrx/store';
import { UserBuilderService } from 'src/app/core/services/utils/user-builder.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  authResponse$!:Observable<AuthResponse>
  error$!:Observable<string | undefined>
  entite:string=""
  entites: string[] = ['SAPRESS', 'SOCHEPRESS', 'SOTADEC', 'WARAKTRADING'];
  
  layoutConfig:LayoutState={
    sideNavItems:[],
    showSideNav:false,
    showFooter:false,
    history:{
      userName:"",
      changeDate:new Date(),
      changeOperation:''
    }
  }

  constructor(private store:Store<AppState>,
    private Layout:LayoutService,
    private fb:FormBuilder,
    private storageService:StorageService,
    private router:Router,
    private userBuilder:UserBuilderService
    ) { }

  emailPattern='^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'

  ngOnInit(): void {

    this.initializeLayout()
    this.createLoginForm()
  }


  createLoginForm=()=>{
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email,Validators.minLength(5),Validators.pattern(this.emailPattern)]],
      password:['',[Validators.required,Validators.minLength(5)]],
      entite:['',[Validators.required]],
    })
  }

  initializeLayout=()=>{

    this.Layout.initializeLayout(this.layoutConfig)
  }

  showEmailErrors(){
    let emailError =''
    const emailForm=this.loginForm.controls['email']
    if(emailForm.value === '')
      emailError="le champ email est requis"
    else if(emailForm.touched && emailForm.invalid){
      emailError='le champ email est invalide'
    } 
    if(emailForm.errors?.['minlength']){
      emailError='le champ email doit contenir au moins 5 caractères'
    }
    return emailError
  }

  showPasswordErrors(){
    let passwordError =''
    const passwordForm=this.loginForm.controls['password']
    if(passwordForm.value === '')
      passwordError='le champ mot de passe est requis'
    else if(passwordForm.touched && passwordForm.invalid){
      passwordError='le champ mot de passe est invalide'
    }
    if(passwordForm.errors?.['minlength']){
      passwordError='le champ mot de passe doit contenir au moins 5 caractères'
    }
    return passwordError
  }

  showEntiteErrors(){
    let entiteError =''
    const entiteForm=this.loginForm.controls['entite']
    if(entiteForm.value === '')
      entiteError='le champ entité est requis'
    else if(entiteForm.touched && entiteForm.invalid){
        entiteError='le champ entité est invalide'
      }
    return entiteError
  }

  onLogin=()=>{

    const email=this.loginForm.controls['email'].value
    const password=this.loginForm.controls['password'].value
    const entite=this.loginForm.controls['entite'].value
 
    this.store.dispatch(loginStart({password,email}))
    

    this.store.pipe(
      select(getLoginSuccess),
      filter( val=> val !== undefined),
      map((authResponse)=>{
          const user=this.userBuilder.fromAuthResponse(authResponse!)
          this.storageService.setItem('user',user)
          this.storageService.setItem('entite',entite)
          this.router.navigate(['gestion/fonctions'])
      })
    ).subscribe().unsubscribe()  

    this.error$=this.store.pipe(
      select(getLoginFailure),
      filter( val=> val !== undefined)
    )
  
  }


}
