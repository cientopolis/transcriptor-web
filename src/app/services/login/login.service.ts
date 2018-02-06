import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http/http.service';

import { LoginCredentials } from '../../models/loginCredentials';

@Injectable()
export class LoginService {

  private loginPath = '/api/login';

  constructor(private httpService: HttpService) { }
  
  login(loginCredentials: LoginCredentials) {
    return this.httpService.post(this.loginPath, loginCredentials);
  }
}
