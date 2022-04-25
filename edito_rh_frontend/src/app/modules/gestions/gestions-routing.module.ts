import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { GestionAffectationsComponent } from './pages/gestion-affectations/gestion-affectations.component';
import { GestionCentresCoutComponent } from './pages/gestion-centres-cout/gestion-centres-cout.component';
import { GestionContratsComponent } from './pages/gestion-contrats/gestion-contrats.component';
import { GestionDirectionsComponent } from './pages/gestion-directions/gestion-directions.component';
import { GestionEmployesComponent } from './pages/gestion-employes/gestion-employes.component';
import { GestionEntitesComponent } from './pages/gestion-entites/gestion-entites.component';
import { GestionFonctionsComponent } from './pages/gestion-fonctions/gestion-fonctions.component';
import { GestionFormulesComponent } from './pages/gestion-formules/gestion-formules.component';
import { GestionRubriquesComponent } from './pages/gestion-rubriques/gestion-rubriques.component';
import { GestionVariablesComponent } from './pages/gestion-variables/gestion-variables.component';
import { GestionVillesComponent } from './pages/gestion-villes/gestion-villes.component';
import { GestionComponent } from './pages/gestion/gestion.component';

const routes: Routes = [
  {path:"fonctions",component:GestionFonctionsComponent},
  {path:"villes",component:GestionVillesComponent},
  {path:"entités",component:GestionEntitesComponent},
  {path:"directions",component:GestionDirectionsComponent},
  {path:"contrats",component:GestionContratsComponent},
  {path:"centres-cout",component:GestionCentresCoutComponent},
  {path:"affectations",component:GestionAffectationsComponent},
  {path:"employés",component:GestionEmployesComponent},
  {path:"rubriques",component:GestionRubriquesComponent},
  {path:"formules",component:GestionFormulesComponent},
  {path:"variables",component:GestionVariablesComponent},
  {path:"",component:GestionComponent},
  {
    path:"",
      loadChildren:()=>import('./modules/models/models.module')
        .then(mod=>mod.ModelsModule),
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionsRoutingModule { }
