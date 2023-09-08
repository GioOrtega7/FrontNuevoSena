import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './Core/auth/auth.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AuthRoutingModule } from './Core/auth/auth-routing.module';
import { CoreModule } from './Core/core.module';
import { HomeComponent } from './Core/home/home.component';
import { HomeModule } from './Core/home/home.module';
import {provideHttpClient} from '@angular/common/http';
import { HomeRoutingModule } from './Core/home/home-routing.module';
import { NavbarComponent } from './Core/home/navbar/navbar.component';
import { PagesModule } from './Modules/Pages/pages.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { SubirArchivosComponent } from './Modules/Pages/subir-archivos/subir-archivos.component';



@NgModule({
  declarations: [
    AppComponent,
    SubirArchivosComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthRoutingModule,
    AuthModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    CoreModule,
    HomeModule,
    HomeRoutingModule,
    PagesModule,
    BrowserAnimationsModule,
    MatDialogModule,

  
  ],
  providers: [
    MatDialog,

    provideHttpClient(),
    importProvidersFrom(MatNativeDateModule),
    {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
