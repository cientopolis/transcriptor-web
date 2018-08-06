import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http/http.service';

@Injectable()
export class PageVersionService {

  private listByPagePath = '/api/page-version/{pageId}/list';

  constructor(private httpService: HttpService) { }

  listByPage(pageId, options = {}) {
    return this.httpService.lget([this.listByPagePath,{pageId:pageId}], options);
  }
}
