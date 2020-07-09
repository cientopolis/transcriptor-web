import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ontology } from 'app/models/scheme/ontology';

@Injectable({
  providedIn: 'root'
})
export class OntologyService {

  
  private listPath = '/api/ontology/list?fields=ontology_datatypes';
  private editPath = '/api/ontology/{id}';
  private deletePath = '/api/ontology/{id}';
  private createPath = '/api/ontology';
  private uploadOntologyPath = '/api/ontology/{id}'

  constructor(private httpService: HttpService) { }


  list(ontology, options = {}): Observable<Ontology[]>  {
    return this.httpService.lget(this.listPath, { responseDataType: Ontology }) as Observable<Ontology[]>;
  }

  edit(ontology, options = {}) {
    return this.httpService.put([this.editPath, { id: ontology.id }], { ontology: ontology }, options);
  }

  delete(ontology, options = {}) {
    return this.httpService.delete([this.deletePath, { id: ontology.id }], options);
  }

  create(ontology, options = {}): Observable<Ontology>  {
    return this.httpService.post(this.createPath, { ontology: ontology }, { responseDataType: Ontology }) as Observable<Ontology>;
  }

  uploadGraph(ontology, formData): Observable<Ontology> {
    return this.httpService
      .put([this.uploadOntologyPath, { id: ontology.id }],
        formData,
        { headers: {}, responseDataType: Ontology }) as Observable<Ontology>;
  }
}
