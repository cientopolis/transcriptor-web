import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SimpleGlobal } from 'ng2-simple-global';

import { FlashMessagesService } from '../util/flash-messages/flash-messages.service';

import { WebserviceResponse } from '../../models/webserviceResponse';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class HttpService {

  baseUrl = 'http://localhost:3000';
  
  private static methods = { get:'GET', post:'POST', put:'PUT', delete:'DELETE'};
    
  public static defaultOptions:any = { 
    headers: { 'Content-Type': 'application/json' },
    fields: [],
    feedback: {
      flashNotifications: true,
      flashMessages: true
    }
  };
  
  public static noFeedbackOptions:any = {
    flashNotifications: false,
    flashMessages: false
  };

  constructor(private http: HttpClient, private global: SimpleGlobal, private flashMessagesService: FlashMessagesService) { }
  
  // loading methods(shortcut without feedback) are represented with initial l
  lget(path, requestOptions = HttpService.defaultOptions) {
    requestOptions.feedback = HttpService.noFeedbackOptions;
    return this.get(path, requestOptions);
  }
  
  lpost(path, data = null, requestOptions = HttpService.defaultOptions) {
    requestOptions.feedback = HttpService.noFeedbackOptions;
    return this.post(path, data, requestOptions);
  }
  
  lput(path, data = null, requestOptions = HttpService.defaultOptions) {
    requestOptions.feedback = HttpService.noFeedbackOptions;
    return this.put(path, data, requestOptions);
  }
  
  ldelete(path, requestOptions = HttpService.defaultOptions) {
    requestOptions.feedback = HttpService.noFeedbackOptions;
    return this.delete(path, requestOptions);
  }
  
  get(path, requestOptions = HttpService.defaultOptions) {
    return this.doRequest(HttpService.methods.get, path, null, requestOptions);
  }
  
  post(path, data = null, requestOptions = HttpService.defaultOptions) {
    return this.doRequest(HttpService.methods.post, path, data, requestOptions);
  }
  
  put(path, data = null, requestOptions = HttpService.defaultOptions) {
    return this.doRequest(HttpService.methods.put, path, data, requestOptions);
  }
  
  delete(path, requestOptions = HttpService.defaultOptions) {
    return this.doRequest(HttpService.methods.delete, path, null, requestOptions);
  }
  
  private doRequest(requestMethod, path, data = {}, requestOptions) {
    requestOptions = Object.assign({},HttpService.defaultOptions,requestOptions);
    let httpOptions = this.getHttpOptions(requestOptions);
    
    let observable = null;
    switch (requestMethod) {
      case HttpService.methods.get:
        observable = this.http.get(this.baseUrl + path, httpOptions);
        break;
      case HttpService.methods.post:
        observable = this.http.post(this.baseUrl + path, data, httpOptions);
        break;
      case HttpService.methods.put:
        observable = this.http.put(this.baseUrl + path, data, httpOptions);
        break;
      case HttpService.methods.delete:
        observable = this.http.delete(this.baseUrl + path, httpOptions);
        break;
    }
    return this.handleResponse(observable, path, requestMethod, requestOptions);
  }
  
  private getAuthToken() {
    if(this.global['currentUser'] && this.global['currentUser']['authentication_token']){
      return this.global['currentUser']['authentication_token'];
    }
    return null;
  }
  
  private getHttpOptions(requestOptions) {
    let headers = new HttpHeaders();
    for(var headerKey in requestOptions.headers){
      headers = headers.append(headerKey,requestOptions.headers[headerKey]);
    };
    if(this.getAuthToken()){
      headers = headers.append('Authorization','Token ' + this.getAuthToken());
    }
    return { headers: headers, params: { 'fields': requestOptions.fields }}
  }
  
  private handleResponse(observable, path, requestMethod, requestOptions) {
    return observable.pipe(
      tap((response: WebserviceResponse) => this.log(response.message, requestOptions)),
      catchError(this.handleError<any>(path + ' ' + requestMethod)),
      map((response: WebserviceResponse) => response.data)
    );
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
  
  private log(message: string, requestOptions = HttpService.defaultOptions) {
    if(requestOptions && requestOptions.feedback.flashMessages) {
      this.flashMessagesService.add(message);
    }
  }
  
}
