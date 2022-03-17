import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
    {
      path:'',
      loadChildren:()=>import('./modules/auth/auth.module')
        .then(mod=>mod.AuthModule),
      canActivate:[AuthGuard]
    },
    {
      path:'',
        loadChildren:()=>import('./modules/gestions/gestions.module')
          .then(mod=>mod.GestionsModule),
      canActivate:[AuthGuard]
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
