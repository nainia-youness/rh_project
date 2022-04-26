import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './core/components/page404/page404.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
    {
      path:'',
      loadChildren:()=>import('./modules/auth/auth.module')
        .then(mod=>mod.AuthModule),
      canActivate:[AuthGuard]
    },
    {
      path:'gestion',
        loadChildren:()=>import('./modules/gestions/gestions.module')
          .then(mod=>mod.GestionsModule),
      canActivate:[AuthGuard]
    },
    {
      path:'**',
      component:Page404Component
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
