import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
      path:'',
      loadChildren:()=>import('./modules/auth/auth.module')
        .then(mod=>mod.AuthModule)
    },
    {//lazy load
      path:'',
        loadChildren:()=>import('./modules/gestions/gestions.module')
          .then(mod=>mod.GestionsModule)
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
