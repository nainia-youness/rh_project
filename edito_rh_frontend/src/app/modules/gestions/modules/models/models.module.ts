import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelsRoutingModule } from './models-routing.module';
import { VilleComponent } from './pages/ville/ville.component';
import { ModelTemplateComponent } from './components/model-template/model-template.component';
import { CreerModelComponent } from './components/creer-model/creer-model.component';
import { UpdateModelComponent } from './components/update-model/update-model.component';
import { ListModelComponent } from './components/list-model/list-model.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/core/material.module';
import { GestionsModule } from '../../gestions.module';
import { SubHeaderComponent } from '../../components/sub-header/sub-header.component';
import { VariableComponent } from './pages/variable/variable.component';
import { FormuleComponent } from './pages/formule/formule.component';
import { AffectationComponent } from './pages/affectation/affectation.component';
import { CentreCoutComponent } from './pages/centre-cout/centre-cout.component';
import { ContratComponent } from './pages/contrat/contrat.component';
import { DirectionComponent } from './pages/direction/direction.component';
import { EntiteComponent } from './pages/entite/entite.component';
import { FonctionComponent } from './pages/fonction/fonction.component';
import { RubriqueComponent } from './pages/rubrique/rubrique.component';
import { EmployeComponent } from './pages/employe/employe.component';


@NgModule({
  declarations: [
    VilleComponent,
    ModelTemplateComponent,
    CreerModelComponent,
    UpdateModelComponent,
    ListModelComponent,
    VariableComponent,
    FormuleComponent,
    AffectationComponent,
    CentreCoutComponent,
    ContratComponent,
    DirectionComponent,
    EntiteComponent,
    FonctionComponent,
    RubriqueComponent,
    EmployeComponent,
  ],
  imports: [
    CommonModule,
    ModelsRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    GestionsModule
  ]
})
export class ModelsModule { }
