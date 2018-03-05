import { Component, OnInit } from '@angular/core';
import {SimpleGlobal} from 'ng2-simple-global';
import { Router } from "@angular/router";

import { LoginCredentials } from '../../models/loginCredentials';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginCredentials:LoginCredentials = new LoginCredentials();
  
  constructor(private loginService: LoginService, private global: SimpleGlobal, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.loginCredentials)
        .subscribe(response => this.handleResponse(response));
  }
  
  private handleResponse(user) {
    if(user){
      this.setUser(user);
      this.router.navigate(['/dashboard']);
    }
  }
  
  private setUser(user){
    this.global['currentUser'] = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

}
