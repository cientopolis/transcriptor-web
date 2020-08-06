import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanAccessGuard } from '../../guards/canAccess/can-access.guard';
import { AuthGuard } from './../../guards/auth/auth.guard';

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
import { SearchComponent } from 'app/components/search/search.component';
import { OntologyComponent } from 'app/components/ontology/ontology.component';
import { MarkSearchComponent } from 'app/components/search/mark-search/mark-search.component';
import { EntitySearchComponent } from 'app/components/search/entity-search/entity-search.component';




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
  { path: 'transcribe/:pageId', component: TranscribeComponent, data: { animation: 'transcribe' }, canActivate: [CanAccessGuard] },
  { path: 'startproject', component: StartProjectComponent, data: { animation: 'startProject' }, canActivate: [AuthGuard] },
  { path: 'work/:workId', component: ShowWorkComponent, data: { animation: 'work' }, canActivate: [CanAccessGuard]},
	{ path: 'collections/list', component: CollectionsComponent, data: {animation:'collections'},canActivate:[CanAccessGuard] },
  { path: 'collection/:collectionId', component: ShowCollectionComponent, data: { animation: 'collection' } },
  { path: 'user/profile', component: UserComponent, canActivate: [CanAccessGuard] },
  { path: 'users/password/recover', component: RequestPasswordRecoverComponent, data: { animation: 'collection' }, canActivate: [CanAccessGuard] },
  { path: 'users/password/edit', component: ChangePasswordComponent, data: { animation: 'collection' }, canActivate: [CanAccessGuard] },
  { path: 'forum/:transcriptionId', component: ForumComponent, data: { animation: 'transcription' }, canActivate: [CanAccessGuard] },
  { path: 'page-version/:pageId', component: PageVersionComponent, data: { animation: 'page-version' }, canActivate: [CanAccessGuard] },
  { path: 'search', component: SearchComponent, data: { animation: 'search' }, canActivate: [CanAccessGuard] },
  { path: 'ontology', component: OntologyComponent, data: { animation: 'ontology' }, canActivate: [CanAccessGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
