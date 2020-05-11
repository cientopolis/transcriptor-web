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
import { MappingUtils } from 'app/utils/mapping-utils';

@Injectable()
export class HttpService {

  baseUrl = environment.apiUrl;

  private static methods = { 
    get: {
      name: 'GET', 
      execute: function(http: HttpClient, uri, data, httpOptions) {
        return http.get(uri, httpOptions);
      }
    },
    post: {
      name: 'POST', 
      execute: function(http: HttpClient, uri, data, httpOptions) {
        return http.post(uri, data, httpOptions);
      }
    },
    put: {
      name: 'PUT', 
      execute: function(http: HttpClient, uri, data, httpOptions) {
        return http.put(uri, data, httpOptions);
      }
    },
    delete: {
      name: 'DELETE',
      execute: function(http: HttpClient, uri, data, httpOptions) {
        return http.delete(uri, httpOptions);
      }
    }
  };

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


  bget(path, requestOptions = this.getDefaultOptions()) {
    
    console.log();
    return this.doRequest(HttpService.methods.get, path,null, requestOptions,true);
  }


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

  private doRequest(requestMethod, path, data = {}, requestOptions,basicRequest = false) {
    requestOptions = Object.assign({},this.getDefaultOptions(),requestOptions);
    // if (!requestOptions.mapper) { requestOptions.mapper = function (any: any) { return any } } 
    let httpOptions = this.getHttpOptions(requestOptions);
    let uri = path;
    if(!basicRequest){
      uri = this.processUri(path);
    }else{
   
      requestOptions['headers']['Access-Control-Allow-Origin'] = "*";
    }
    console.log(requestOptions);
    console.log(uri);
    let observable = null;
    observable = requestMethod.execute(this.http, uri, data, httpOptions);
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
      catchError(this.handleError<any>(path + ' ' + requestMethod.name)),
      map((response: WebserviceResponse) => this.mapData(response.data, requestOptions.responseDataType, requestOptions.mapper))
    );
  }

  private mapData(data, responseDataType, mapper) {
    if (mapper) {
      // about to use mapping function defined on class
      if (Array.isArray(data)) {
        return data.map(rawObject => { return mapper(rawObject) })
      }
      return mapper(data)
    }
    if (responseDataType) {
      // about to use default mapping with MappingUtils
      if (Array.isArray(data)) {
        return data.map(rawObject => { return MappingUtils.mapToClass(responseDataType, rawObject) })
      }
      return MappingUtils.mapToClass(responseDataType, data)
    }
    // returns raw data
    return data;
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
