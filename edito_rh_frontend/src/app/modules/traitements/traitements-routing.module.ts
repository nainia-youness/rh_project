import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { TraitementsComponent } from './pages/traitements/traitements.component';

const routes: Routes = [
  {path:"",component:TraitementsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraitementsRoutingModule { }
