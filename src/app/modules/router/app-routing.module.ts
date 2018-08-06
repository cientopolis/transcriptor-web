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
import { UserComponent } from '../../components/user/user.component';
import { RequestPasswordRecoverComponent } from '../../components/password/request-password-recover/request-password-recover.component';
import { ChangePasswordComponent } from '../../components/password/change-password/change-password.component';
import { PublicationContainerComponent } from '../../components/forum/publication-container/publication-container.component';
import { ForumComponent } from '../../components/forum/forum.component';
import { PageVersionComponent } from '../../components/page-version/page-version.component';



const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent,
	data:{
			breadcrumb: 'Home',
			url:'/home'
		}
	},
  { path: 'login', component: LoginComponent, data: {animation:'login'} },
  { path: 'dashboard', component: DashboardComponent, data: {animation:'dashboard',breadcrumb: 'Dashboard',url:'dashboard'} },
  { path: 'transcribe/:pageId', component: TranscribeComponent, data: {animation:'transcribe'} },
  { path: 'startproject', component: StartProjectComponent, data: {animation:'startProject'} },
  { path: 'work/:workId', component: ShowWorkComponent, data: {animation:'work'} },
	{ path: 'collections/list', component: CollectionsComponent, data: {animation:'collections'} },
  { path: 'collection/:collectionId', component: ShowCollectionComponent, data: {animation:'collection'} },
  { path: 'user/profile', component: UserComponent },
  { path: 'users/password/recover', component: RequestPasswordRecoverComponent, data: {animation:'collection'} },
  { path: 'users/password/edit', component: ChangePasswordComponent, data: {animation:'collection'} },
	{ path: 'forum/:transcriptionId', component: ForumComponent, data: {animation:'transcription'} },
  { path: 'page-version/:pageId', component: PageVersionComponent, data: {animation:'page-version'} }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
