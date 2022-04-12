import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionFonctionsComponent } from './pages/gestion-fonctions/gestion-fonctions.component';
import { GestionComponent } from './pages/gestion/gestion.component';

const routes: Routes = [
  {path:"fonctions",component:GestionFonctionsComponent},
  {path:"",component:GestionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionsRoutingModule { }
