import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OntologyService {

  
  private listPath = '/api/ontology/list';
  private editPath = '/api/ontology/{id}';
  private deletePath = '/api/ontology/{id}';
  private createPath = '/api/ontology';

  constructor(private httpService: HttpService) { }


  list(ontology, options = {}) {
    return this.httpService.lget([this.listPath,{}], options);
  }

  edit(ontology, options = {}) {
    return this.httpService.put([this.editPath, { id: ontology.id }], ontology, options);
  }

  delete(ontology, options = {}) {
    return this.httpService.delete([this.deletePath, { id: ontology.id }], options);
  }

  create(ontology, options = {}) {
    return this.httpService.post(this.createPath,ontology,options);
  }
}
