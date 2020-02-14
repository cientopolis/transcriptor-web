import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

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
import { MzSpinnerModule } from 'ng2-materialize';
import { MzTooltipModule } from 'ng2-materialize';
import { MzCollapsibleModule } from 'ng2-materialize';
import { MzCheckboxModule } from 'ng2-materialize';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';

import { SimpleGlobal } from 'ng2-simple-global';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';

import { NgxEditorModule } from 'ngx-editor';

import { Ng2IziToastModule } from 'ng2-izitoast';

import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './modules/router/app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login/login.service';
import { HttpService } from './services/http/http.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TranscribeComponent } from './components/transcribe/transcribe.component';
import { MarkService } from './services/mark/mark.service';
import { PageService } from './services/page/page.service';
import { DashboardService } from './services/dashboard/dashboard.service';
import { FlashMessagesService } from './services/util/flash-messages/flash-messages.service';
import { UploadComponent } from './components/shared/upload/upload.component';
import { StartProjectComponent } from './components/start-project/start-project.component';
import { CollectionService } from './services/collection/collection.service';
import { UploadService } from './services/upload/upload.service';

import { ShowWorkComponent } from './components/work/show-work/show-work.component';
import { WorkService } from './services/work/work.service';
import { UserService } from './services/user/user.service';
import { EditWorkComponent } from './components/work/edit-work/edit-work.component';
import { ListWorkPagesComponent } from './components/work/list-work-pages/list-work-pages.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { ShowCollectionComponent } from './components/collection/show-collection/show-collection.component';
import { ListCollectionWorksComponent } from './components/collection/list-collection-works/list-collection-works.component';
import { EditCollectionComponent } from './components/collection/edit-collection/edit-collection.component';
import { UserComponent } from './components/user/user.component';
import { MarkDetailsComponent } from './components/transcribe/mark-details/mark-details.component';
import { TranscriptionService } from './services/transcription/transcription.service';
import { MarkTranscriptionsListComponent } from './components/transcribe/mark-transcriptions-list/mark-transcriptions-list.component';
import { TranscriptionContainerComponent } from './components/transcribe/transcription-container/transcription-container.component';
import { TextEditorComponent } from './components/transcribe/text-editor/text-editor.component';
import { TranscriptionFormComponent } from './components/transcribe/transcription-form/transcription-form.component';
import { TranscribeService } from './services/transcribe/transcribe.service';
import { RequestPasswordRecoverComponent } from './components/password/request-password-recover/request-password-recover.component';
import { ChangePasswordComponent } from './components/password/change-password/change-password.component';
import { PasswordService } from './services/password/password.service';
import { AlertMessagesService } from './services/util/alert-messages/alert-messages.service';
import { BadgesComponent } from './components/user/badges/badges.component';
import { BadgeService } from './services/badge/badge.service';
import { PublicationContainerComponent } from './components/forum/publication-container/publication-container.component';
import { PublicationService } from './services/forum/publication.service';
import { ForumComponent } from './components/forum/forum.component';
import { ForumService } from './services/forum/forum.service';
import { PublicationsListComponent } from './components/forum/publications-list/publications-list.component';
import { BasicTextEditorComponent } from './components/transcribe/basic-text-editor/basic-text-editor.component';
import { PageVersionComponent } from './components/page-version/page-version.component';
import { PageVersionService } from './services/page-version/page-version.service';
import { CreateCollectionModalComponent } from './components/shared/create-collection-modal/create-collection-modal.component';
import { LayerService } from './services/layer/layer.service';

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
    DashboardComponent,
    UserComponent,
    MarkDetailsComponent,
    MarkTranscriptionsListComponent,
    TranscriptionContainerComponent,
    TextEditorComponent,
    TranscriptionFormComponent,
    RequestPasswordRecoverComponent,
    ChangePasswordComponent,
    BadgesComponent,
    PublicationContainerComponent,
    ForumComponent,
    PublicationsListComponent,
    BasicTextEditorComponent,
    PageVersionComponent,
    CreateCollectionModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MzNavbarModule,
    MzParallaxModule,
    MzCardModule,
    MzInputModule,
    MzDropdownModule,
    MzModalModule,
    MzButtonModule,
    MzTextareaModule,
    MzCheckboxModule,
    MzIconModule,
    MzIconMdiModule,
    MzSelectModule,
    MzTabModule,
    MzCollectionModule,
    MzSpinnerModule,
    MzTooltipModule,
    MzCollapsibleModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    NgProgressRouterModule,
    LeafletModule.forRoot(),
    LeafletDrawModule.forRoot(),
    NgxEditorModule,
    Ng2IziToastModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    SimpleGlobal,
    LoginService,
    HttpService,
    MzInjectionService,
    MzToastService,
    MarkService,
    PageService,
    DashboardService,
    FlashMessagesService,
    CollectionService,
    UploadService,
    WorkService,
    UserService,
    TranscriptionService,
    TranscribeService,
    PasswordService,
    AlertMessagesService,
    BadgeService,
    PublicationService,
    ForumService,
    PageVersionService,
    LayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
