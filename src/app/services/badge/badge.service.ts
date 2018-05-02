import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http/http.service';


@Injectable()
export class BadgeService {
  
    private listPath = '/api/user/badges';

    constructor(private httpService: HttpService) { }

    list(options = {}) {
      return this.httpService.lget(this.listPath,options);
    }

}
