import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { historyChange, showFooterChange, showHeaderMenuChange, showSideNavChange, sideNavItemsChange } from 'src/app/shared/components/layout/state/layout.actions';
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


  constructor(private store:Store<AppState>) { }

  emailPattern='^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'

  ngOnInit(): void {
    this.store.dispatch(showSideNavChange({showSideNav:false}))
    this.store.dispatch(sideNavItemsChange({sideNavItems:['','Gestion des employés','Gestion des fonctions','Gestion des directions','Gestion des entité']}))
    this.store.dispatch(showFooterChange({showFooter:false}))
    this.store.dispatch(historyChange({history:{
      userName:"userName",
      changeDate:new Date("11/24/2021"),
      changeOperation:'update'
    }}))
    this.store.dispatch(showHeaderMenuChange({showHeaderMenu:false}))

    
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
      email:this.loginForm.controls['password'].value,
      password:this.loginForm.controls['email'].value
    }

    this.store.dispatch(loginChange({login:login}))

  }
  
}
