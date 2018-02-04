import { Component, OnInit } from '@angular/core';

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
  
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.loginCredentials)
        .subscribe(response => this.user = response);
  }
  
}
