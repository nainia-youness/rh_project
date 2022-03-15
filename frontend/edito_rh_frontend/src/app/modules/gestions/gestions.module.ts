import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionsRoutingModule } from './gestions-routing.module';
import { GestionFonctionsComponent } from './pages/gestion-fonctions/gestion-fonctions.component';
import { GestionTemplateComponent } from './components/gestion-template/gestion-template.component';


@NgModule({
  declarations: [
    GestionFonctionsComponent,
    GestionTemplateComponent,
  ],
  imports: [
    CommonModule,
    GestionsRoutingModule
  ]
})
export class GestionsModule { }
