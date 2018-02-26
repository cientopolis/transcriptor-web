import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SimpleGlobal } from 'ng2-simple-global';

import { FlashMessagesService } from '../util/flash-messages/flash-messages.service';

import { WebserviceResponse } from '../../models/webserviceResponse';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class HttpService {

  baseUrl = 'http://localhost:3000';
  baseHeaders = { 'Content-Type': 'application/json' };
  
  private static methods = { get:'GET', post:'POST', put:'PUT', delete:'DELETE'};

  constructor(private http: HttpClient, private global: SimpleGlobal, private flashMessagesService: FlashMessagesService) { }
  
  get(path) {
    return this.doRequest(HttpService.methods.get, path);
  }
  
  post(path, data = null) {
    return this.doRequest(HttpService.methods.post, path, data);
  }
  
  put(path, data = null) {
    return this.doRequest(HttpService.methods.put, path, data);
  }
  
  delete(path) {
    return this.doRequest(HttpService.methods.delete, path);
  }
  
  
  private doRequest(requestMethod, path, data = {}) {
    let observable = null
    switch (requestMethod) {
      case HttpService.methods.get:
        observable = this.http.get(this.baseUrl + path, this.getHttpOptions());
        break;
      case HttpService.methods.post:
        observable = this.http.post(this.baseUrl + path, data, this.getHttpOptions());
        break;
      case HttpService.methods.put:
        observable = this.http.put(this.baseUrl + path, data, this.getHttpOptions());
        break;
      case HttpService.methods.delete:
        observable = this.http.delete(this.baseUrl + path, this.getHttpOptions());
        break;
    }
    return this.handleResponse(observable, path, requestMethod);
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
  
  private handleResponse(observable, path, requestMethod) {
    return observable.pipe(
      tap((response: WebserviceResponse) => this.log(response.message)),
      catchError(this.handleError<any>(path + ' ' + requestMethod)),
      map((response: WebserviceResponse) => response.data)
    )
  }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  private log(message: string) {
    this.flashMessagesService.add(message);
  }
  
}
