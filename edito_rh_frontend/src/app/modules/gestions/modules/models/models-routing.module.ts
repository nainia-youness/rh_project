import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormuleComponent } from './pages/formule/formule.component';
import { VariableComponent } from './pages/variable/variable.component';
import { VilleComponent } from './pages/ville/ville.component';

const routes: Routes = [
  {path:"villes/:id",component:VilleComponent},
  {path:"variables/:id",component:VariableComponent},
  {path:"formules/:id",component:FormuleComponent},
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelsRoutingModule { }
