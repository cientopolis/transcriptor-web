import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { MzNavbarModule } from 'ng2-materialize';
import { MzParallaxModule } from 'ng2-materialize';
import { MzCardModule } from 'ng2-materialize';
import { MzInputModule } from 'ng2-materialize';

import { SimpleGlobal } from 'ng2-simple-global';

import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './modules/router/app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login/login.service';
import { HttpService } from './services/http/http.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MzNavbarModule,
    MzParallaxModule,
    MzCardModule,
    MzInputModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SimpleGlobal,LoginService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
