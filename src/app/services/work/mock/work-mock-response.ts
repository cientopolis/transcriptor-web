import { WebserviceResponse } from '../../../models/webserviceResponse'

export class WorkMockResponse {
  
  public static get(workId){
    var work = require('./data/one-work.json');
    return new WebserviceResponse('OK','',work);
  }
  
  public static delete(workId){
    var work = require('./data/one-work.json');
    return new WebserviceResponse('OK','',work);
  }
  
  public static edit(workId){
    var work = require('./data/one-work.json');
    return new WebserviceResponse('OK','',work);
  }
  
  public static listPages(workId){
    var pages = require('../../page//mock/data/many-pages.json');
    return new WebserviceResponse('OK','',pages);
  }
}
