import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http/http.service';

@Injectable()
export class CollectionService {

  private listPath = '/api/collection/list_own';
  private getPath = '/api/collection/{collectionId}';
  private listWorksPath = '/api/collection/{collectionId}/works';
  private editPath = '/api/collection/{collectionId}';
  private deletePath = '/api/collection/{collectionId}';

  constructor(private httpService: HttpService) { }
  
  listOwn() {
    return this.httpService.lget(this.listPath);
  }
  
  get(collectionId, options = {}) {
    return this.httpService.lget([this.getPath,{collectionId:collectionId}], options);
  }
  
  listWorks(collectionId, options = {}) {
    return this.httpService.lget([this.listWorksPath,{collectionId:collectionId}], options);
  }
  
  edit(collection, options = {}) {
    return this.httpService.put([this.editPath,{collectionId:collection.id}], collection, options);
  }
  
  delete(collectionId, options = {}) {
    return this.httpService.delete([this.deletePath,{collectionId:collectionId}], options);
  }
}
