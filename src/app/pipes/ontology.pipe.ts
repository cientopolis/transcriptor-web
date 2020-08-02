import { SemanticUtils } from './../utils/semantic-utils';
import { SimpleGlobal } from 'ng2-simple-global';
import { Pipe, PipeTransform } from '@angular/core';
import { Ontology } from 'app/models/ontology/ontology';

@Pipe({
  name: 'ontology_type'
})
export class OntologyPipe implements PipeTransform {
  constructor(private global:SimpleGlobal){}

  transform(value: string): any {
    if(value!=null){
      let ontologies = this.global['ontologies'];
      this.addFixedPRefix(ontologies);
      let str = SemanticUtils.filterPrefixFromOntology(ontologies, value);
      str = SemanticUtils.filterURLFromOntology(ontologies, str);
      return str;
    }else{
      return "-";
    }
  }

  private addFixedPRefix(ontologies){
    let ontologyrdf = new Ontology();
    ontologyrdf.prefix ='rdf';
    ontologyrdf.url ='http://www.w3.org/1999/02/22-rdf-syntax-ns#';
    ontologies.push(ontologyrdf);
    let ontologyrdfs = new Ontology();
    ontologyrdfs.prefix = 'rdfs';
    ontologyrdfs.url = 'http://www.w3.org/2000/01/rdf-schema#';
    ontologies.push(ontologyrdfs);
  }
}
