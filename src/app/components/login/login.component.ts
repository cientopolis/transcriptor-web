import { OntologyService } from './../../services/ontology/ontology.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import {SimpleGlobal} from 'ng2-simple-global';
import { Router } from "@angular/router";

import { LoginCredentials } from '../../models/loginCredentials';
import { LoginService } from '../../services/login/login.service';
import { UserService } from '../../services/user/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('modalCreateUser') modalCreateUser;
  user:any = {};

  loginCredentials:LoginCredentials = new LoginCredentials();

  constructor(private userService: UserService,
              private loginService: LoginService, 
              public global: SimpleGlobal, 
              private router: Router,
              private ontologyService: OntologyService) { }

  ngOnInit() {
  }

  getOntologies(){
    this.ontologyService.list({}).subscribe(response => {
      if (response) {
        this.global['ontologies']=response;
      }
    })
  }
  login(formValue: NgForm) {
    this.loginService.login(this.loginCredentials)
        .subscribe(response => this.handleResponse(response));
  }

  private handleResponse(user) {
    if(user){
      this.setUser(user);
      this.userService.userInfoMetagame()
      .subscribe(response => this.handleResponseMG(user,response));
      this.getOntologies();
    }
  }

  private handleResponseMG(user,response) {
    if(response && response.player){
      user.rank=response.player.rank;
      this.setUser(user);
    }
      this.router.navigate(['/dashboard']);
  }

  private setUser(user){
    this.global['currentUser'] = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  public openCreateAccount() {
    this.modalCreateUser.openModal();
  }
  
  public createUser() {
      this.userService.create(this.user)
        .subscribe(response => this.handleResponse(response));
  }

}
