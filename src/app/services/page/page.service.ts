import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http/http.service';

@Injectable()
export class PageService {

  private getPath = '/api/page';

  constructor(private httpService: HttpService) { }
  
  get(pageId) {
    let path = this.getPath + '/' + pageId;
    return this.httpService.lget(path);
  }
  
  imagePath(page) {
    return this.httpService.baseUrl + page.base_image_url;
  }
}
