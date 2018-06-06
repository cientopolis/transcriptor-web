import { Component, OnInit,ViewChild } from '@angular/core';
import {SimpleGlobal} from 'ng2-simple-global';
import { Router } from "@angular/router";

import { LoginCredentials } from '../../models/loginCredentials';
import { LoginService } from '../../services/login/login.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('modalCreateUser') modalCreateUser;
  user = {};

  loginCredentials:LoginCredentials = new LoginCredentials();

  constructor(private userService: UserService,private loginService: LoginService, private global: SimpleGlobal, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.loginCredentials)
        .subscribe(response => this.handleResponse(response));
  }

  private handleResponse(user) {
    if(user){
      this.setUser(user);
      console.log(user);
      this.userService.userInfoMetagame(user)
          .subscribe(response => this.handleResponseMG(user,response));


    }
  }

  private handleResponseMG(user,response) {
    console.log("hmH");
    if(response){
      console.log(response);
      user.rank=response;
      this.setUser(user);
    }
      this.router.navigate(['/dashboard']);
  }

  private setUser(user){
    this.global['currentUser'] = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  private openCreateAccount() {
    this.modalCreateUser.open();
  }
  private createUser() {
      this.userService.create(this.user)
        .subscribe(response => this.handleResponse(response));
  }

}
