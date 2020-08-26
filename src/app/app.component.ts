import { OntologyService } from './services/ontology/ontology.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SimpleGlobal} from 'ng2-simple-global';
import {TranslateService} from '@ngx-translate/core';

import { LoginService } from './services/login/login.service';
import { routeAnimation } from './utils/animations';

import { enable as enableDarkMode, disable as disableDarkMode } from 'darkreader'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routeAnimation ]
})
export class AppComponent implements OnInit{
  title = 'Transcriptor';
  darkModeEnabled = false;

  constructor(private loginService: LoginService, public global: SimpleGlobal, private router: Router, public translate: TranslateService,  private ontologyService: OntologyService) {
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang);
  }

  ngOnInit() {
    //usar interceptor
    let storedUser=localStorage.getItem('currentUser');
    if(storedUser != null){
      this.setUser(JSON.parse(storedUser));
      this.getOntologies();
    }else{
      this.getFunctions();
    }
    this.loadDarkMode();
  }
  getFunctions(){
    this.loginService.getFunctions({}).subscribe(response =>{
      console.log(response);
      localStorage.setItem('functions', JSON.stringify(response));     
    });
  }

  getOntologies() {
    this.ontologyService.list({}).subscribe(response => {
      if (response) {
        this.global['ontologies'] = response;
      }
    })
  }

  logout() : void {
    localStorage.removeItem('currentUser');
    this.global['currentUser'] = null;
    this.global['isOwner'] = null;
    localStorage.removeItem('functions');
    localStorage.removeItem('currentUser');
    this.router.navigate(['home'])
  }

  private setUser(user){
    this.global['currentUser'] = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  
  getAvatarUrl(username) {
    return 'https://ui-avatars.com/api/?name='+ username + '&background=f61&color=fff&rounded=true';
  }

  getAnimationData(routerOutlet: any) {
    return routerOutlet.activatedRouteData['animation'] || 'login';
  }

  useLanguage(lang){
    this.translate.use(lang)
  }

  loadDarkMode() {
    this.darkModeEnabled = localStorage.getItem('darkModeEnabled') == 'true'; 
    this.setDarkMode()
  }

  toggleDarkMode() {
    this.darkModeEnabled = !this.darkModeEnabled;
    this.setDarkMode()
  }

  setDarkMode() {
    this.global['darkModeEnabled'] = this.darkModeEnabled;
    localStorage.setItem('darkModeEnabled', this.darkModeEnabled + "");
    if (this.darkModeEnabled) {
      enableDarkMode({
        brightness: 100,
        contrast: 90,
        sepia: 10
      })
    } else {
      disableDarkMode();
    }
  }
}
