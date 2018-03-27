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


const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transcribe/:pageId', component: TranscribeComponent },
  { path: 'startproject', component: StartProjectComponent },
  { path: 'work/:workId', component: ShowWorkComponent },
	{ path: 'collections/list', component: CollectionsComponent },
  { path: 'collection/:collectionId', component: ShowCollectionComponent },
	{ path: 'user/profile', component: UserComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
