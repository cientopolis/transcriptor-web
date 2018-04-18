import { Component, OnInit } from '@angular/core';

import { PasswordService } from '../../../services/password/password.service';

@Component({
  selector: 'app-request-password-recover',
  templateUrl: './request-password-recover.component.html',
  styleUrls: ['./request-password-recover.component.scss']
})
export class RequestPasswordRecoverComponent implements OnInit {
  
  email:string;
  requestSended:boolean = false;

  constructor(private passwordService:PasswordService) { }

  ngOnInit() {
  }

  sendRecoverRequest() {
    this.passwordService.requestRecover(this.email)
        .subscribe(response => this.requestSended = true);
  }
}
