import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../../components/home/home.component';
import { LoginComponent } from '../../components/login/login.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { TranscribeComponent } from '../../components/transcribe/transcribe.component';
import { StartProjectComponent } from '../../components/start-project/start-project.component';
import { ShowCollectionComponent } from '../../components/collection/show-collection/show-collection.component';
import { ShowWorkComponent } from '../../components/work/show-work/show-work.component';
import { CollectionsComponent } from '../../components/collections/collections.component';


const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: {animation:'home'} },
  { path: 'login', component: LoginComponent, data: {animation:'login'} },
  { path: 'dashboard', component: DashboardComponent, data: {animation:'dashboard'} },
  { path: 'transcribe/:pageId', component: TranscribeComponent, data: {animation:'transcribe'} },
  { path: 'startproject', component: StartProjectComponent, data: {animation:'startProject'} },
  { path: 'work/:workId', component: ShowWorkComponent, data: {animation:'work'} },
	{ path: 'collections/list', component: CollectionsComponent, data: {animation:'collections'} },
  { path: 'collection/:collectionId', component: ShowCollectionComponent, data: {animation:'collection'} }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
