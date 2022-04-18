import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionsRoutingModule } from './gestions-routing.module';
import { GestionFonctionsComponent } from './pages/gestion-fonctions/gestion-fonctions.component';
import { GestionTemplateComponent } from './components/gestion-template/gestion-template.component';
import { MaterialModule } from 'src/app/core/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltersComponent } from './components/filters/filters.component';
import { TableComponent } from './components/table/table.component';
import { GestionComponent } from './pages/gestion/gestion.component';
import { GestionVillesComponent } from './pages/gestion-villes/gestion-villes.component';
import { GestionEntitesComponent } from './pages/gestion-entites/gestion-entites.component';
import { GestionDirectionsComponent } from './pages/gestion-directions/gestion-directions.component';
import { GestionContratsComponent } from './pages/gestion-contrats/gestion-contrats.component';
import { GestionCentresCoutComponent } from './pages/gestion-centres-cout/gestion-centres-cout.component';


@NgModule({
  declarations: [
    GestionFonctionsComponent,
    GestionTemplateComponent,
    FiltersComponent,
    TableComponent,
    GestionComponent,
    GestionVillesComponent,
    GestionEntitesComponent,
    GestionDirectionsComponent,
    GestionContratsComponent,
    GestionCentresCoutComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GestionsRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class GestionsModule { }
