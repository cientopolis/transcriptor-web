import { Component, OnInit } from '@angular/core';
import {SimpleGlobal} from 'ng2-simple-global';

import { LoginCredentials } from '../../models/loginCredentials';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginCredentials:LoginCredentials = new LoginCredentials();
  user = null;
  
  constructor(private loginService: LoginService, private globalService: SimpleGlobal) { }

  ngOnInit() {
    //usar interceptor
    let storedUser=localStorage.getItem('currentUser');
    if(storedUser != null){
      this.setUser(JSON.parse(storedUser));
    }
  }

  login() {
    this.loginService.login(this.loginCredentials)
        .subscribe(response => this.setUser(response));
  }
  
  logout() : void {
    localStorage.removeItem('currentUser');
    this.globalService['currentUser'] = null;
  }
  
  setUser(user){
    this.user = user;
    this.globalService['currentUser'] = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  
}
