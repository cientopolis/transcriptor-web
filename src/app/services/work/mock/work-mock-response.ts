import { WebserviceResponse } from '../../../models/webserviceResponse'

export class WorkMockResponse {
  
  public static get(workId){
    var work = require('./data/one-work.json');
    return new WebserviceResponse('OK','fake-response',work);
  }
}
