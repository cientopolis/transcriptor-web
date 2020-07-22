import { OntologyPipe } from 'app/pipes/ontology.pipe';
import { SimpleGlobal } from 'ng2-simple-global';
import { MarkSemanticRelation } from './../../../../models/marksemanticrelation';
import { SemanticUtils } from './../../../../utils/semantic-utils';
import { RelationOntologyClass } from './../../../../models/ontology/class/relationOntologyClass';
import { SemanticModelService } from 'app/services/semantic-model/semantic-model.service';
import { HeaderService } from './../../../../services/sharedData/header.service';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ontology } from 'app/models/ontology/ontology';

@Component({
  selector: 'app-add-relationship',
  templateUrl: './add-relationship.component.html',
  styleUrls: ['./add-relationship.component.scss']
})
export class AddRelationshipComponent implements OnInit {
  @ViewChild('referenceDetailModalRelation') referenceDetailModal;

  @Input() public mark:any;
  @Input() public layername:any;
  @Output() public saved = new EventEmitter<any>();
  relationships = new Array<RelationOntologyClass>();
  relationselected:any;
  searchRelationshipList: any;
  semanticItemSelected: any;
  typesSelected: any;
  typeselected:any;
  relation = new MarkSemanticRelation();
  ontology:Ontology;
  hierarchical = true;
  constructor(private headerService:HeaderService,
              private semanticService: SemanticModelService,
              public global: SimpleGlobal,
               private semanticPipe: OntologyPipe ) { }

  ngOnInit() {
    this.relation.subject_id=this.mark.id;
    this.getOntology();
    this.setHeader();
    this.getRelationships();
  }
  getOntology(){
    let ontologies = this.global['ontologies'];
    ontologies.forEach(ontology => {
      if (this.mark.type.includes(ontology.url) || this.mark.type.includes(ontology.prefix)){
          this.ontology=ontology;
          if(this.ontology.name.toLocaleLowerCase().includes('foaf')){
            // this.hierarchical=false;
          }
        }
    });    
  }

  private withoutPrefix(relation){
    return this.semanticPipe.transform(relation);
  }



  setHeader() {
    this.headerService.header = 'Agregar una relación';
    this.headerService.headerSubparagraph = null;
    this.headerService.headerParagraph = this.layername + ' / '+ this.mark.name + ' / Agregar relación';
    this.headerService.showDetails = false;
    this.headerService.headerStep = true;
    this.headerService.stepNumber = 1;
  }

  getRelationships() {
    this.relationships = new Array<RelationOntologyClass>();
    let clazz = this.mark.type;
    if(this.ontology){
      clazz = this.ontology.prefix +':'+ this.withoutPrefix(this.mark.type);
    }
    let param = { class: clazz };
    this.semanticService.getRelationships(param).subscribe(result => {
      let relations = result;
      let propertiesClass = new Array<RelationOntologyClass>();
      relations.forEach(prop => {
        propertiesClass.push(new RelationOntologyClass(prop));
      });
      this.relationships = SemanticUtils.sortProperties(propertiesClass);
      if (this.relationships.length > 0) {
        this.relationselected=this.relationships[0];
        this.typesSelected = this.relationselected.types;
        if (this.typesSelected.length > 0) {
          this.typeselected = this.typesSelected[0];
        }
      }
      
/*       this.loader = false; */
    });
  }

  itemChange(event){
    this.semanticItemSelected.name = this.semanticItemSelected['rdfs:label'];
    this.semanticItemSelected.type = this.semanticItemSelected['@type'];
    this.semanticItemSelected.id = this.semanticItemSelected['@id'];
    this.relation.object_id = event['@id'];
  }
  showMarkDetail(mark=null){}

  selectRelation(relation,event){
    this.typesSelected = this.relationselected.types;
    this.relation.predicate_id = this.relationselected.property;
    if (this.typesSelected.length>0){
      this.typeselected = this.typesSelected[0];
    }
    this.clearEntity();
  }

  selectType(type, event) {
    this.clearEntity();
  }
  clearEntity(){
    this.semanticItemSelected=null;
    this.relation.object_id=null;
  }

  save(){
    this.semanticService.addRelation(this.relation).subscribe(response => {
      this.saved.emit();
    })  
  }

  showEntityDetail() {
    if (this.semanticItemSelected) {
      this.referenceDetailModal.detailMark=false;
      this.referenceDetailModal.detailMark = true;
      this.referenceDetailModal.open({ semanticContribution: { slug: SemanticUtils.extractTranscriptorSchema(this.semanticItemSelected.id), schema_type: this.semanticItemSelected.type, text: {} } }, null, false)
      }
    }
  }
