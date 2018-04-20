import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http/http.service';

@Injectable()
export class PasswordService {

  private requestRecoverPath = '/api/users/password';
  private changePath = '/api/users/password/confirm';

  constructor(private httpService: HttpService) { }

  requestRecover(email, options={}){
    return this.httpService.post(this.requestRecoverPath, {email:email}, options);
  }
  
  change(passwordRequest, options={}){
    return this.httpService.post(this.changePath, passwordRequest, options);
  }
}
