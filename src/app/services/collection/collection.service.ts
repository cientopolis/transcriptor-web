import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http/http.service';

@Injectable()
export class CollectionService {

  private listPath = '/api/collection/list_own';
  private collectionsPath = '/api/collection';

  constructor(private httpService: HttpService) { }

  listOwn() {
    return this.httpService.lget(this.listPath);
  }
  listCollections(options = {}){
    console.log("serc")
    let path = this.collectionsPath + "/list";
    return this.httpService.get(path,options);
  }

}
