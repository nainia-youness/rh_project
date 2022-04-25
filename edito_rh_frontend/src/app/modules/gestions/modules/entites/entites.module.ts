import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntitesRoutingModule } from './entites-routing.module';
import { VilleComponent } from './pages/ville/ville.component';


@NgModule({
  declarations: [
    VilleComponent
  ],
  imports: [
    CommonModule,
    EntitesRoutingModule
  ]
})
export class EntitesModule { }
