import { SemanticUtils } from 'app/utils/semantic-utils';
import { OntologyPipe } from './../ontology.pipe';
import { SimpleGlobal } from 'ng2-simple-global';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ontologyPrefix'
})
export class OntologyPrefixPipe implements PipeTransform {
  constructor(private global: SimpleGlobal,private ontologyType:OntologyPipe) { }
  transform(value: any, args?: any): any {

    if(value!=null){
      let ontologies = this.global['ontologies'];
      let str = SemanticUtils.setOntologyPrefix(ontologies, value);
      return str;
    }else{
      return "-";
    }
  }

}
