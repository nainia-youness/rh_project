import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionFonctionsComponent } from './pages/gestion-fonctions/gestion-fonctions.component';

const routes: Routes = [
  {path:"fonctions",component:GestionFonctionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionsRoutingModule { }
