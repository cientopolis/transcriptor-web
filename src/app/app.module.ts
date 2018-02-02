import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { MzNavbarModule } from 'ng2-materialize';
import { MzParallaxModule } from 'ng2-materialize';
import { MzCardModule } from 'ng2-materialize'

import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './modules/router/app-routing.module'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MzNavbarModule,
	MzParallaxModule,
	MzCardModule,
	AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
