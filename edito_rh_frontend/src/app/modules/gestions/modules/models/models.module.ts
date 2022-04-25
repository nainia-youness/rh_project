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


@NgModule({
  declarations: [
    VilleComponent,
    ModelTemplateComponent,
    CreerModelComponent,
    UpdateModelComponent,
    ListModelComponent,
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
