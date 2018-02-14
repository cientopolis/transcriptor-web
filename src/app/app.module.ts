import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { MzNavbarModule } from 'ng2-materialize';
import { MzParallaxModule } from 'ng2-materialize';
import { MzCardModule } from 'ng2-materialize';
import { MzInputModule } from 'ng2-materialize';
import { MzDropdownModule } from 'ng2-materialize';
import { MzModalModule } from 'ng2-materialize';
import { MzInjectionService } from 'ng2-materialize';
import { MzModalService } from 'ng2-materialize';
import { MzButtonModule } from 'ng2-materialize';
import { MzTextareaModule } from 'ng2-materialize';

import { SimpleGlobal } from 'ng2-simple-global';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';

import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './modules/router/app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login/login.service';
import { HttpService } from './services/http/http.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TranscribeComponent } from './components/transcribe/transcribe.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    TranscribeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MzNavbarModule,
    MzParallaxModule,
    MzCardModule,
    MzInputModule,
    MzDropdownModule,
    MzModalModule,
    MzButtonModule,
    MzTextareaModule,
    LeafletModule.forRoot(),
    LeafletDrawModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SimpleGlobal,LoginService, HttpService, MzInjectionService, MzModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
