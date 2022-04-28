import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffectationComponent } from './pages/affectation/affectation.component';
import { CentreCoutComponent } from './pages/centre-cout/centre-cout.component';
import { ContratComponent } from './pages/contrat/contrat.component';
import { DirectionComponent } from './pages/direction/direction.component';
import { EmployeComponent } from './pages/employe/employe.component';
import { EntiteComponent } from './pages/entite/entite.component';
import { FonctionComponent } from './pages/fonction/fonction.component';
import { FormuleComponent } from './pages/formule/formule.component';
import { RubriqueComponent } from './pages/rubrique/rubrique.component';
import { VariableComponent } from './pages/variable/variable.component';
import { VilleComponent } from './pages/ville/ville.component';

const routes: Routes = [
  {path:"villes/:id",component:VilleComponent},
  {path:"variables/:id",component:VariableComponent},
  {path:"formules/:id",component:FormuleComponent},
  {path:"affectations/:id",component:AffectationComponent},
  {path:"centres-cout/:id",component:CentreCoutComponent},
  {path:"contrats/:id",component:ContratComponent},
  {path:"directions/:id",component:DirectionComponent},
  {path:"entités/:id",component:EntiteComponent},
  {path:"fonctions/:id",component:FonctionComponent},
  {path:"rubriques/:id",component:RubriqueComponent},
  {path:"employés/:id",component:EmployeComponent},
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelsRoutingModule { }
