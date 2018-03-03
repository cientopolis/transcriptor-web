import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http/http.service';


@Injectable()
export class WorkService {

  private getPath = '/api/work/{workId}';
  private listPagesPath = '/api/work/{workId}/pages';

  constructor(private httpService: HttpService) { }

  get(workId, options = {}) {
    return this.httpService.lget([this.getPath,{workId:workId}], options);
  }
  
  listPages(workId, options = {}) {
    return this.httpService.lget([this.listPagesPath,{workId:workId}], options);
  }
}
