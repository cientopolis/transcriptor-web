import { SelectOntologyTypeComponent } from './components/transcribe/semantic/semantic-form/steps/select-ontology-type/select-ontology-type.component';
import { ListSemanticMarksComponent } from './components/transcribe/semantic/semantic-form/list/list.component';
import { SemanticModelService } from './services/semantic-model/semantic-model.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppComponent } from './app.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import localePt from '@angular/common/locales/pt';
import localeIt from '@angular/common/locales/it';
registerLocaleData(localeEn, 'en');
registerLocaleData(localeEs, 'es');
registerLocaleData(localeFr, 'fr');
registerLocaleData(localePt, 'pt');
registerLocaleData(localeIt, 'it');

import { MzNavbarModule } from 'ngx-materialize';
import { MzParallaxModule } from 'ngx-materialize';
import { MzCardModule } from 'ngx-materialize';
import { MzInputModule } from 'ngx-materialize';
import { MzDropdownModule } from 'ngx-materialize';
import { MzModalModule } from 'ngx-materialize';
import { MzInjectionService } from 'ngx-materialize';
import { MzButtonModule } from 'ngx-materialize';
import { MzBadgeModule } from 'ngx-materialize';
import { MzTextareaModule } from 'ngx-materialize';
import { MzIconModule, MzIconMdiModule } from 'ngx-materialize';
import { MzToastModule } from 'ngx-materialize';
import { MzToastService } from 'ngx-materialize';
import { MzSelectModule } from 'ngx-materialize';
import { MzTabModule } from 'ngx-materialize';
import { MzCollectionModule } from 'ngx-materialize';
import { MzSpinnerModule } from 'ngx-materialize';
import { MzTooltipModule } from 'ngx-materialize';
import { MzCollapsibleModule } from 'ngx-materialize';
import { MzCheckboxModule } from 'ngx-materialize';
import { MzSwitchModule } from 'ngx-materialize';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';

import { SimpleGlobal } from 'ng2-simple-global';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';

import { NgxEditorModule } from 'ngx-editor';

import { NgxIziToastModule } from 'ngx-izitoast';

import { NgCircleProgressModule } from 'ng-circle-progress';

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
import { LayerModalComponent } from './components/transcribe/layer/layer-modal/layer-modal.component';
import { SemanticTextEditorComponent } from './components/transcribe/semantic-text-editor/semantic-text-editor.component';
import { ImageSettingsComponent } from './components/transcribe/image-settings/image-settings.component';
import { PlayerProfileComponent } from './components/dashboard/player-profile/player-profile.component';
import { SemanticFormComponent } from './components/transcribe/semantic/semantic-form/semantic-form.component';
import { DataPropertieInputsComponent } from './components/transcribe/semantic/semantic-form/datapropertie-inputs/datapropertie-inputs.component.component';
import { MzDatepickerModule } from 'ngx-materialize'
import { MzTimepickerModule } from 'ngx-materialize';
import { SemanticTranscriptionDetailsComponent } from './components/transcribe/semantic/semantic-form/semantic-transcription-details/semantic-transcription-details.component';
import { HeaderComponentComponent } from './components/transcribe/semantic/semantic-form/header-component/header-component.component';
import { SelectPropertiesComponent } from './components/transcribe/semantic/semantic-form/steps/select-properties/select-properties.component';
import { SelectRelationshipsComponent } from './components/transcribe/semantic/semantic-form/steps/select-relationships/select-relationships.component';
import { SelectBasicPropertiesComponent } from './components/transcribe/semantic/semantic-form/steps/select-basic-properties/select-basic-properties.component';
import { SearchComponent } from './components/search/search.component';
import { SearchInputComponent } from './components/shared/search-input/search-input.component';
import { SemanticSearchInputComponent } from './components/search/semantic-search-input/semantic-search-input.component';

import { OntologyPipe } from './pipes/ontology.pipe';
import { LocalizedDatePipe } from './pipes/localized-date/localized-date.pipe';
import { SafeHtmlPipe } from './pipes/safe-html/safe-html.pipe';
import { HighlightSearchPipe } from './pipes/highlight-search/highlight-search.pipe';
import { ReferenceContainerComponent } from './components/search/reference-container/reference-container.component';
import { ReferenceDetailModalComponent } from './components/search/reference-detail-modal/reference-detail-modal.component';
import { SearchSemanticRelationshipComponent } from './components/transcribe/semantic/search-semantic-relationship/search-semantic-relationship.component';
import { ShowRelationshipItemComponent } from './components/transcribe/semantic/search-semantic-relationship/show-relationship-item/show-relationship-item.component';
import { OntologiesComponent } from './components/transcribe/semantic/ontologies/ontologies.component';
import { OntologyComponent } from './components/ontology/ontology.component';
import { MarkSearchComponent } from './components/search/mark-search/mark-search.component';
import { OntologySearchInputComponent } from './components/search/ontology-search-input/ontology-search-input.component';
import { EmptyValuePipe } from './pipes/empty-values/empty-value.pipe';
import { AddRelationshipComponent } from './components/transcribe/semantic/add-relationship/add-relationship.component';

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
    CreateCollectionModalComponent,
    LayerModalComponent,
    SemanticTextEditorComponent,
    PlayerProfileComponent,
    SemanticFormComponent,
    ListSemanticMarksComponent,
    OntologyPipe,
    DataPropertieInputsComponent,
    SemanticTranscriptionDetailsComponent,
    HeaderComponentComponent,
    SelectOntologyTypeComponent,
    SelectPropertiesComponent,
    SelectRelationshipsComponent,
    SelectBasicPropertiesComponent,
    ImageSettingsComponent,
    LocalizedDatePipe,
    SafeHtmlPipe,
    SearchComponent,
    SearchInputComponent,
    SemanticSearchInputComponent,
    HighlightSearchPipe,
    ReferenceContainerComponent,
    ReferenceDetailModalComponent,
    SearchSemanticRelationshipComponent,
    ShowRelationshipItemComponent,
    OntologiesComponent,
    OntologyComponent,
    MarkSearchComponent,
    OntologySearchInputComponent,
    EmptyValuePipe,
    AddRelationshipComponent
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
    MzBadgeModule,
    MzSelectModule,
    MzTabModule,
    MzCollectionModule,
    MzSpinnerModule,
    MzTooltipModule,
    MzCollapsibleModule,
    MzSwitchModule,
    NgProgressModule,
    NgProgressHttpModule,
    NgProgressRouterModule,
    LeafletModule.forRoot(),
    LeafletDrawModule.forRoot(),
    NgxEditorModule,
    NgxIziToastModule,
    NgCircleProgressModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    MzDatepickerModule,
    MzTimepickerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en' },
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: LOCALE_ID, useValue: 'it' },
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
    LayerService,
    SemanticModelService,
    OntologyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
