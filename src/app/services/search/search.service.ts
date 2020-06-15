import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private listSemanticReferencesPath = '/api/semantic_entity/list_references';

  constructor(private httpService: HttpService) { }

  listSemanticReferences(filter = {}, options = {}) {
    return this.httpService.lpost(this.listSemanticReferencesPath, { filter: filter }, options);
  }
}
