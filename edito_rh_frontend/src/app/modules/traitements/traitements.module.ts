import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraitementsRoutingModule } from './traitements-routing.module';
import { TraitementsComponent } from './pages/traitements/traitements.component';
import { MaterialModule } from 'src/app/core/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionTemplateComponent } from '../gestions/components/gestion-template/gestion-template.component';
import { GestionsModule } from '../gestions/gestions.module';


@NgModule({
  declarations: [
    TraitementsComponent
  ],
  imports: [
    CommonModule,
    TraitementsRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    GestionsModule
  ]
})
export class TraitementsModule { }
