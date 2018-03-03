import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http/http.service';


@Injectable()
export class WorkService {

  private getPath = '/api/work/';

  constructor(private httpService: HttpService) { }

  get(workId, options = {}) {
    let path = this.getPath + workId;
    return this.httpService.lget(path,options);
  }
}
