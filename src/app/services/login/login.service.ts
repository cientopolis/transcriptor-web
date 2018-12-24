import { Injectable } from '@angular/core';
import {SimpleGlobal} from 'ng2-simple-global';
import { Router } from "@angular/router";

import { HttpService } from '../../services/http/http.service';

import { LoginCredentials } from '../../models/loginCredentials';

@Injectable()
export class LoginService {

  private loginPath = '/api/login';

  constructor(private httpService: HttpService, public global: SimpleGlobal, private router: Router) { }
  
  login(loginCredentials: LoginCredentials) {
    return this.httpService.post(this.loginPath, loginCredentials);
  }
  
  newSession(user){
    if(user){
      this.global['currentUser'] = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/dashboard']);
    }
  }
}
