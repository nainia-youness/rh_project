import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelsRoutingModule } from './models-routing.module';
import { VilleComponent } from './pages/ville/ville.component';
import { ModelTemplateComponent } from './components/model-template/model-template.component';


@NgModule({
  declarations: [
    VilleComponent,
    ModelTemplateComponent
  ],
  imports: [
    CommonModule,
    ModelsRoutingModule
  ]
})
export class ModelsModule { }
