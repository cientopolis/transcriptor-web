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
import { MzButtonModule } from 'ng2-materialize';
import { MzTextareaModule } from 'ng2-materialize';
import { MzIconModule, MzIconMdiModule } from 'ng2-materialize';
import { MzToastModule } from 'ng2-materialize';
import { MzToastService } from 'ng2-materialize';
import { MzSelectModule } from 'ng2-materialize';
import { MzTabModule } from 'ng2-materialize';
import { MzCollectionModule } from 'ng2-materialize';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';

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
import { MarkService } from './services/mark/mark.service';
import { PageService } from './services/page/page.service';
import { FlashMessagesService } from './services/util/flash-messages/flash-messages.service';
import { UploadComponent } from './components/shared/upload/upload.component';
import { StartProjectComponent } from './components/start-project/start-project.component';
import { CollectionService } from './services/collection/collection.service';
import { UploadService } from './services/upload/upload.service';
import { ShowWorkComponent } from './components/work/show-work/show-work.component';
import { WorkService } from './services/work/work.service';
import { EditWorkComponent } from './components/work/edit-work/edit-work.component';
import { ListWorkPagesComponent } from './components/work/list-work-pages/list-work-pages.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { ShowCollectionComponent } from './components/collection/show-collection/show-collection.component';
import { ListCollectionWorksComponent } from './components/collection/list-collection-works/list-collection-works.component';
import { EditCollectionComponent } from './components/collection/edit-collection/edit-collection.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TranscribeComponent,
    DashboardComponent,
    UploadComponent,
    StartProjectComponent,
    ShowWorkComponent,
    EditWorkComponent,
    ListWorkPagesComponent,
    CollectionsComponent,
    ShowCollectionComponent,
    ListCollectionWorksComponent,
    EditCollectionComponent,
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
    MzIconModule,
    MzIconMdiModule,
    MzSelectModule,
    MzTabModule,
    MzCollectionModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    NgProgressRouterModule,
    LeafletModule.forRoot(),
    LeafletDrawModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    SimpleGlobal,
    LoginService,
    HttpService,
    MzInjectionService,
    MzToastService,
    MarkService,
    PageService,
    FlashMessagesService,
    CollectionService,
    UploadService,
    WorkService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
