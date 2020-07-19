import { SimpleGlobal } from 'ng2-simple-global';
import { SemanticUtils } from './../../../../../utils/semantic-utils';
import { ontologyClassInstance } from './../../../../../models/ontology/instance/ontologyClassInstance';
import { OntologyService } from './../../../../../services/ontology/ontology.service';
import { SemanticModelService } from '../../../../../services/semantic-model/semantic-model.service';
import { SchemeUtils } from '../../../../../utils/schema-utils';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Ontology } from 'app/models/ontology/ontology';
import { OntologyClass } from 'app/models/ontology/class/ontologyClass';

@Component({
  selector: 'app-show-relationship-item',
  templateUrl: './show-relationship-item.component.html',
  styleUrls: ['./show-relationship-item.component.scss']
})
export class ShowRelationshipItemComponent implements OnInit {
  @Input() public semanticItem = null;
  @Input() public onlyShow = false;
  @Input() public isPreviousSave = true;
  @Output() public finished = new EventEmitter<any>();
  type:string;
  markView = null;
  loadedRelation=false;
  compacted:any;
  ontology:Ontology;

  constructor(private semanticService: SemanticModelService, 
              private ontologyService: OntologyService,
              public global: SimpleGlobal ) { }

  ngOnInit() {
    let ontologies = this.global['ontologies'];
    /**el type puede contener url, estamos manejando prefix asi que sanitisamos por las dudas */
    this.type = this.semanticItem['@type'];
    this.markView = { slug: SemanticUtils.extractTranscriptorSchema(this.semanticItem['@id']),semanticContribution: { text: this.semanticItem, schema_type: this.type } };
    if (ontologies) {
      if(!SemanticUtils.isUrl(this.type)){
        let prefix = SemanticUtils.getPrefix(this.type);
        ontologies.forEach(ontology => {
          if (ontology.prefix.includes(prefix)) {
            this.ontology = new Ontology(ontology);
            this.type = SemanticUtils.filterURLFromOntology(ontologies, this.type);
            this.type = SemanticUtils.filterPrefixFromOntology(ontologies, this.type);
            this.saveScheme();
          }
        });
      }else{
        ontologies.forEach(ontology => {
          if (this.type.includes(ontology.url)) {
            this.ontology = new Ontology(ontology);
            this.type = SemanticUtils.filterURLFromOntology(ontologies, this.type);
            this.type = SemanticUtils.filterPrefixFromOntology(ontologies, this.type);
            this.saveScheme();
          }
        });
      }
    }
  }

  saveScheme() {
    let ontologyInstance = new ontologyClassInstance();
    ontologyInstance.ontologyClass = new OntologyClass();
    ontologyInstance.ontologyClass.ontology=this.ontology;
    this.type=this.ontology.prefix+':'+this.type;
    let e = this.semanticService.generateJsonld(ontologyInstance, this.semanticItem).then(
      function (success) {
        return success;
      }
    );
    e.then(
      result => {

        this.markView = { slug: SemanticUtils.extractTranscriptorSchema(this.semanticItem['@id']),semanticContribution: { text: result['schema:mainEntity'], type: this.type } };
        this.compacted=result;
        this.loadedRelation=true;
        return result;
      }
    );
  }
  save(){
    let obj = { schema_type: this.type, semantic_text: this.compacted, contribution_slug: SchemeUtils.getSlug(this.compacted['@id']), label: this.compacted['rdfs:label'] };
    this.finished.emit(obj);

  }
  back(){
    this.finished.emit({ schema_type: ''});
  }

}
