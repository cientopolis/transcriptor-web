import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {SimpleGlobal} from 'ng2-simple-global';

import { PasswordService } from '../../../services/password/password.service';
import { LoginService } from '../../../services/login/login.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passwordRequest:any = {
    reset_password_token:null,
    password:null,
    password_confirmation:null
  }

  constructor(private passwordService:PasswordService, private activatedRoute: ActivatedRoute, private loginService: LoginService) {
    this.activatedRoute.queryParams.subscribe(params => {
        this.passwordRequest.reset_password_token = params['reset_password_token'];
    });
  }

  ngOnInit() {
  }

  changePassword(){
    this.passwordService.change(this.passwordRequest)
        .subscribe(user => this.loginService.newSession(user));
  }
  
}
