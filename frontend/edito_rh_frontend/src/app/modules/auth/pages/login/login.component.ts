import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LayoutState } from 'src/app/shared/components/layout/state/layout.interface';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AppState } from 'src/app/store/app.state';
import { loginChange } from '../../state/auth.actions';
import { Login } from '../../state/auth.interface';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;


  constructor(private store:Store<AppState>,private Layout:LayoutService) { }

  emailPattern='^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'

  ngOnInit(): void {

    const layoutConfig:LayoutState={
      sideNavItems:['','Gestion des employés','Gestion des fonctions','Gestion des directions','Gestion des entité'],
      showSideNav:false,
      showFooter:false,
      showHeaderMenu:false,
      history:{
        userName:"userName",
        changeDate:new Date("11/24/2021"),
        changeOperation:'update'
      }
    }
    this.Layout.initializeLayout(layoutConfig)
    
    this.loginForm=new FormGroup({
      email: new FormControl('',[
        Validators.required,Validators.email,Validators.minLength(5),Validators.pattern(this.emailPattern)
      ]),
      password: new FormControl(null,[
        Validators.required,Validators.minLength(5)
      ])
    })

  }

  showEmailErrors(){
    let emailError =''
    const emailForm=this.loginForm.controls['email']
    if(emailForm.value === '' || emailForm.value ===null)
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
    if(passwordForm.value === '' || passwordForm.value ===null)
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
      email:this.loginForm.controls['password'].value,
      password:this.loginForm.controls['email'].value
    }

    this.store.dispatch(loginChange({login:login}))

  }
  
}
