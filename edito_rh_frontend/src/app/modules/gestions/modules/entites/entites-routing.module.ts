import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VilleComponent } from './pages/ville/ville.component';

const routes: Routes = [
  {path:"villes/:id",component:VilleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntitesRoutingModule { }
