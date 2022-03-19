import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './core/material.module';

import { appEffects, appReducers } from './store/app.state';

import { HeaderSideNavComponent } from './shared/components/layout/header-side-nav/header-side-nav.component';
import { SidenavComponent } from './shared/components/layout/sidenav/sidenav.component';
import { HeaderComponent } from './shared/components/layout/header/header.component';
import { AuthModule } from './modules/auth/auth.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { FooterComponent } from './shared/components/layout/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './core/guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HeaderSideNavComponent,
    FooterComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    StoreModule.forRoot(appReducers),
    MaterialModule,
    AuthModule,
    StoreDevtoolsModule.instrument({
      maxAge:25,
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
    EffectsModule.forRoot(appEffects)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
