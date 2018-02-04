import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginCredentials } from '../../models/loginCredentials';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class LoginService {

  private loginUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) { }
  
  login(loginCredentials: LoginCredentials) {
    return this.http.post(this.loginUrl, loginCredentials, httpOptions);
  }
}
