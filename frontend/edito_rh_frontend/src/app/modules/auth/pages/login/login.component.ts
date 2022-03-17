import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { LayoutState } from 'src/app/shared/components/layout/state/layout.interface';
import { User } from 'src/app/shared/models/user.model';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';
import {loginChange } from '../../state/auth.actions';
import { Login } from '../../state/auth.interface';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;

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
    private router:Router
    ) { }

  emailPattern='^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'

  ngOnInit(): void {

    this.initializeLayout()
    this.createLoginForm()

  
  }


  createLoginForm=()=>{
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email,Validators.minLength(5),Validators.pattern(this.emailPattern)]],
      password:['',[Validators.required,Validators.minLength(5)]]
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

  onLogin=()=>{
    const login:Login={
      email:this.loginForm.controls['email'].value,
      password:this.loginForm.controls['password'].value
    }
    //send this data to the api (service http)
    //decode it with JWT service
    //receive this
    const user:User={
      email:this.loginForm.controls['email'].value,
      firstName:"youness",
      familyName:"nainia"
      //all user permissions
    }
    this.store.dispatch(loginChange({login:login}))

    this.storageService.setItem('user',user)

    this.router.navigate(['gestionFonctions']);
    //change the header state to login
    //create guard so that he can t come back to login page
  }
  
}
