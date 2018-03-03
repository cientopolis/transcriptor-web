import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../../components/home/home.component';
import { LoginComponent } from '../../components/login/login.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { TranscribeComponent } from '../../components/transcribe/transcribe.component';
import { StartProjectComponent } from '../../components/start-project/start-project.component';
import { ShowWorkComponent } from '../../components/show-work/show-work.component';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transcribe/:pageId', component: TranscribeComponent },
  { path: 'startproject', component: StartProjectComponent },
  { path: 'work/:workId', component: ShowWorkComponent } 
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
