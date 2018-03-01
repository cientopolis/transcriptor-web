import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http/http.service';

@Injectable()
export class CollectionService {

  private listPath = '/api/collection/list_own';

  constructor(private httpService: HttpService) { }
  
  listOwn() {
    return this.httpService.lget(this.listPath);
  }

}
