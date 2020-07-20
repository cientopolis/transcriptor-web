import { SemanticUtils } from './../utils/semantic-utils';
import { SimpleGlobal } from 'ng2-simple-global';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ontology_type'
})
export class OntologyPipe implements PipeTransform {
  constructor(private global:SimpleGlobal){}

  transform(value: string): any {
    if(value!=null){
      let ontologies = this.global['ontologies'];
      let str = SemanticUtils.filterPrefixFromOntology(ontologies, value);
      str = SemanticUtils.filterURLFromOntology(ontologies, str);
      return str;
    }else{
      return "-";
    }
  }

}
