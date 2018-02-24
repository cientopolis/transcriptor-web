import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SimpleGlobal } from 'ng2-simple-global';

import { WebserviceResponse } from '../../models/webserviceResponse';

@Injectable()
export class HttpService {

  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private global: SimpleGlobal) { }
  
  baseHeaders = { 'Content-Type': 'application/json' };
  
  get(path) {
    return this.http.get(this.baseUrl + path, this.getHttpOptions())
                    .map((response: WebserviceResponse) => response.data);
  }
  
  post(path, data = null) {
    return this.http.post(this.baseUrl + path, data, this.getHttpOptions())
                    .map((response: WebserviceResponse) => response.data);
  }
  
  put(path, data = null) {
    return this.http.put(this.baseUrl + path, data, this.getHttpOptions())
                    .map((response: WebserviceResponse) => response.data);
  }
  
  delete(path) {
    return this.http.delete(this.baseUrl + path, this.getHttpOptions())
                    .map((response: WebserviceResponse) => response.data);
  }
  
  private getAuthToken() {
    if(this.global['currentUser'] && this.global['currentUser']['authentication_token']){
      return this.global['currentUser']['authentication_token'];
    }
    return null;
  }
  
  private getHttpOptions() {
    let headers = new HttpHeaders();
    for(var headerKey in this.baseHeaders){
      headers = headers.append(headerKey,this.baseHeaders[headerKey]);
    };
    if(this.getAuthToken()){
      headers = headers.append('Authorization','Token ' + this.getAuthToken());
    }
    return { headers: headers}
  }
  
}
