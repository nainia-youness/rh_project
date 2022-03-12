import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './core/material.module';

import { appReducer } from './store/app.state';

import { HeaderSideNavComponent } from './shared/components/layout/header-side-nav/header-side-nav.component';
import { SidenavComponent } from './shared/components/layout/sidenav/sidenav.component';
import { HeaderComponent } from './shared/components/layout/header/header.component';
import { AuthModule } from './modules/auth/auth.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { FooterComponent } from './shared/components/layout/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HeaderSideNavComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    StoreModule.forRoot(appReducer),
    MaterialModule,
    AuthModule,
    StoreDevtoolsModule.instrument({
      maxAge:25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
