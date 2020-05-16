import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http/http.service';
import { Collection } from 'app/models/Collection';
import { Observable } from 'rxjs';
import { Work } from 'app/models/work';

@Injectable()
export class CollectionService {

  private listPath = '/api/collection/list_own';
  private collectionsPath = '/api/collection';
  private getPath = '/api/collection/{collectionId}';
  private listWorksPath = '/api/collection/{collectionId}/works';
  private editPath = '/api/collection/{collectionId}';
  private deletePath = '/api/collection/{collectionId}';
  private createPath = '/api/collection';
  private uploadCollectionPath = '/api/collection/update/{collectionId}'

  constructor(private httpService: HttpService) { }

  listOwn() {
    return this.httpService.lget(this.listPath);
  }

  listCollections(options = {}): Observable <Collection>{
    let path = this.collectionsPath + "/list";
    return this.httpService.lget(path, { responseDataType: Collection }) as Observable<Collection>;
  }
  
  get(collectionId, options = {}) {
    return this.httpService.lget([this.getPath, { collectionId: collectionId }], { responseDataType: Collection });
  }
  
  listWorks(collectionId, options = {}): Observable<Work[]> {
    options['responseDataType'] = Work
    return this.httpService.lget([this.listWorksPath, { collectionId: collectionId }], options) as Observable<Work[]>;
  }
  
  edit(collection, options = {}): Observable<Collection> {
    return this.httpService.put([this.editPath, { collectionId: collection.id }], collection, { responseDataType: Collection }) as Observable<Collection>;
  }
  
  delete(collectionId, options = {}) {
    return this.httpService.delete([this.deletePath,{collectionId:collectionId}], options);
  }
  
  create(collection, options = {}) {
    return this.httpService.post(this.createPath,collection,options);
  }

  uploadCollection(collectionId, formData): Observable<Collection> {
    return this.httpService
      .post([this.uploadCollectionPath, { collectionId: collectionId }], 
        formData, 
        { headers: {}, responseDataType: Collection }) as Observable<Collection>;
  }
}
