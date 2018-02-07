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
  
  constructor(private loginService: LoginService, private global: SimpleGlobal) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.loginCredentials)
        .subscribe(response => this.setUser(response));
  }
  
  private setUser(user){
    this.global['currentUser'] = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  
}
