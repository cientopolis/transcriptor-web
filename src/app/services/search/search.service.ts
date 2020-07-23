import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private listSemanticReferencesPath = '/api/semantic_entity/list_references';
  private listMarksPath = '/api/search/marks';
  private listLoadedEntitiesPath = '/api/semantic_ontology/search_loaded_components';

  constructor(private httpService: HttpService) { }

  listSemanticReferences(filter = {}, options = {}) {
    return this.httpService.lpost(this.listSemanticReferencesPath, { filter: filter }, options);
  }

  listMarks(filter = {}, options = {}) {
    return this.httpService.lpost(this.listMarksPath, { filter: filter }, options);
  }

  listLoadedEntities(filter = {}, options = {}) {
    return this.httpService.lpost(this.listLoadedEntitiesPath, { filter: filter }, options);
  }
}
