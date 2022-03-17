import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionsRoutingModule } from './gestions-routing.module';
import { GestionFonctionsComponent } from './pages/gestion-fonctions/gestion-fonctions.component';
import { GestionTemplateComponent } from './components/gestion-template/gestion-template.component';
import { MaterialModule } from 'src/app/core/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChooseEntiteComponent } from './components/dialogs/choose-entite/choose-entite.component';


@NgModule({
  declarations: [
    GestionFonctionsComponent,
    GestionTemplateComponent,
    ChooseEntiteComponent,
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
