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


@NgModule({
  declarations: [
    GestionFonctionsComponent,
    GestionTemplateComponent,
    FiltersComponent,
    TableComponent,
    GestionComponent,
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
