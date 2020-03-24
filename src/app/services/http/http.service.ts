import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SimpleGlobal } from 'ng2-simple-global';
import * as UriTemplate from 'uri-templates';

import { environment } from '../../../environments/environment';

import { FlashMessagesService } from '../util/flash-messages/flash-messages.service';
import { AlertMessagesService } from '../util/alert-messages/alert-messages.service';

import { WebserviceResponse } from '../../models/webserviceResponse';

import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class HttpService {

  baseUrl = environment.apiUrl;

  private static methods = { get:'GET', post:'POST', put:'PUT', delete:'DELETE'};

  public static defaultOptions:any = {
    headers: { 'Content-Type': 'application/json' },
    fields: [],
    feedback: {
      flashNotifications: true,
      flashMessages: true,
      alertMessages: true
    }
  };

  public static noFeedbackOptions:any = {
    flashNotifications: false,
    flashMessages: false
  };

  constructor(
    private http: HttpClient,
    public global: SimpleGlobal,
    private flashMessagesService: FlashMessagesService,
    private alertMessagesService: AlertMessagesService) { }

  // loading methods(shortcut without feedback) are represented with initial l
  lget(path, requestOptions = this.getDefaultOptions()) {
    requestOptions.feedback = HttpService.noFeedbackOptions;
    return this.get(path, requestOptions);
  }

  lpost(path, data = null, requestOptions = this.getDefaultOptions()) {
    requestOptions.feedback = HttpService.noFeedbackOptions;
    return this.post(path, data, requestOptions);
  }

  lput(path, data = null, requestOptions = this.getDefaultOptions()) {
    requestOptions.feedback = HttpService.noFeedbackOptions;
    return this.put(path, data, requestOptions);
  }

  ldelete(path, requestOptions = this.getDefaultOptions()) {
    requestOptions.feedback = HttpService.noFeedbackOptions;
    return this.delete(path, requestOptions);
  }

  get(path, requestOptions = this.getDefaultOptions()) {
    return this.doRequest(HttpService.methods.get, path, null, requestOptions);
  }

  post(path, data = null, requestOptions = this.getDefaultOptions()) {
    return this.doRequest(HttpService.methods.post, path, data, requestOptions);
  }

  put(path, data = null, requestOptions = this.getDefaultOptions()) {
    return this.doRequest(HttpService.methods.put, path, data, requestOptions);
  }

  delete(path, requestOptions = this.getDefaultOptions()) {
    return this.doRequest(HttpService.methods.delete, path, null, requestOptions);
  }

  private doRequest(requestMethod, path, data = {}, requestOptions) {
    requestOptions = Object.assign({},this.getDefaultOptions(),requestOptions);
    let httpOptions = this.getHttpOptions(requestOptions);
    let uri = this.processUri(path);

    let observable = null;
    switch (requestMethod) {
      case HttpService.methods.get:
        observable = this.http.get(uri, httpOptions);
        break;
      case HttpService.methods.post:
        observable = this.http.post(uri, data, httpOptions);
        break;
      case HttpService.methods.put:
        observable = this.http.put(uri, data, httpOptions);
        break;
      case HttpService.methods.delete:
        observable = this.http.delete(uri, httpOptions);
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
      tap((response: WebserviceResponse) => this.generateMessages(response, requestOptions)),
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
  
  private generateMessages(response:any,requestOptions = this.getDefaultOptions()){
    this.log(response.message, requestOptions);
    this.throwAlert(response.alert, requestOptions);
  }
  
  private log(message: string, requestOptions = this.getDefaultOptions()) {
    if(requestOptions && requestOptions.feedback.flashMessages) {
      this.flashMessagesService.add(message);
    }
  }
  
  private throwAlert(alert: any, requestOptions = this.getDefaultOptions()) {
    if(alert && requestOptions && requestOptions.feedback.alertMessages) {
      this.alertMessagesService.add(alert.title,alert.message);
    }
  }

  private processUri(path){
    if(path instanceof Array){
      return this.baseUrl + new UriTemplate(path[0]).fill(path[1]);
    }
    return this.baseUrl + path;
  }

  private getDefaultOptions(){
    return JSON.parse(JSON.stringify(HttpService.defaultOptions));
  }
}
