import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SimpleGlobal} from 'ng2-simple-global';
import {TranslateService} from '@ngx-translate/core';

import { LoginService } from './services/login/login.service';
import { routeAnimation } from './utils/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ routeAnimation ]
})
export class AppComponent implements OnInit{
  title = 'Transcriptor';
  
  constructor(private loginService: LoginService, private global: SimpleGlobal, private router: Router, public translate: TranslateService) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
  }
  
  ngOnInit() {
    //usar interceptor
    let storedUser=localStorage.getItem('currentUser');
    if(storedUser != null){
      this.setUser(JSON.parse(storedUser));
    }
  }
  
  logout() : void {
    localStorage.removeItem('currentUser');
    this.global['currentUser'] = null;
    this.router.navigate(['home'])
  }
  
  private setUser(user){
    this.global['currentUser'] = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  
  getAnimationData(routerOutlet: any) {
    return routerOutlet.activatedRouteData['animation'] || 'login';
  }
  
  useLanguage(lang){
    this.translate.use(lang)
  }
}
