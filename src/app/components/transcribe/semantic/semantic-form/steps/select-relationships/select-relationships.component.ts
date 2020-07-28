import { SemanticUtils } from './../../../../../../utils/semantic-utils';
import { RelationOntologyInstance } from './../../../../../../models/ontology/instance/relationOntologyInstance';
import { SemanticModelService } from 'app/services/semantic-model/semantic-model.service';
import { RelationOntologyClass } from '../../../../../../models/ontology/class/relationOntologyClass';
import { ontologyClassInstance } from '../../../../../../models/ontology/instance/ontologyClassInstance';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-select-relationships',
  templateUrl: './select-relationships.component.html',
  styleUrls: ['./select-relationships.component.scss']
})
export class SelectRelationshipsComponent implements OnInit,OnChanges {
  @ViewChild('modalAddRelationPropertie') modalAddRelationPropertie;
  @Input() properties = new Array<any>();
  @Input() schemeName: String;
  relationships = new Array<RelationOntologyClass>();
  relationshipsSelected = new Array<any>();
  @Output() public relationshipGenerated = new EventEmitter<any>();
  @Input() notifyNextStep = false;
  level = 0;
  searchText:String;
  @Input() ontologyInstance: ontologyClassInstance;
  loader=true;


  constructor(private semanticService: SemanticModelService) { 

  }

  ngOnChanges(changes) {
    if (changes.notifyNextStep && changes.notifyNextStep.currentValue) {
      this.generateSchemeRelationships();
    } 
    if (changes.ontologyInstance) {
      if (!changes.ontologyInstance.previousValue || (changes.ontologyInstance.previousValue.name != changes.ontologyInstance.currentValue.name)) {
        if (this.ontologyInstance != null && this.ontologyInstance.name != null) {
          this.getRelationships();
        }
      }
    }
  }
  ngOnInit() {
  }

  getRelationships() {
    this.relationships = new Array<RelationOntologyClass>();
    this.relationshipsSelected = new Array<any>();
    let param = { class: this.ontologyInstance.name };
    this.semanticService.getRelationships(param).subscribe(result => {
      let relations = result;
      let propertiesClass = new Array<RelationOntologyClass>();
      relations.forEach(prop => {
        propertiesClass.push(new RelationOntologyClass(prop,this.ontologyInstance.ontologyClass));
      });
      this.relationships = SemanticUtils.sortProperties(propertiesClass);
      this.loader = false;
    });
  }
  public openModalSelectRelarionship() {
    this.modalAddRelationPropertie.openModal();
  }

  handleRelationGenerated(event){
    this.relationshipsSelected.forEach(relationship => {
      if (event.label == relationship.label) {
        relationship.properties = event.properties;
      }
    })
  }
  generateSchemeRelationships(){
    let relationships = new Array<RelationOntologyInstance>();
    this.relationshipsSelected.forEach(relation => {
      if (relation.searchRelationship && relation.relationPersisted){
        relationships.push(relation);
      }
      if (relation.properties.length>0){
        relationships.push(relation);
      }
    })
    this.relationshipGenerated.emit({
      relationshipsSelected: relationships
    });
  }
  


  hasRanges(properties,prop){
    return (properties[prop]['@type'] != "rdfs:Class" && properties[prop]['schema:rangeIncludes']);
  }


  handleDeleteRelationship(event){
    let relationship = { selected:false,name:event.name};
    this.relationshipsSelected.forEach((item, index) => {
      if (item.label.toLowerCase() === event.label.toLowerCase()) this.relationshipsSelected.splice(index, 1);
    });
    this.relationships.forEach( prop => {
      if (prop.label.toLowerCase() == event.label.toLowerCase()) { prop.selected = false; return}
    })
  }

  selectRelation(relation, $event) {
    if (relation.selected) {
      let relationInstance = new RelationOntologyInstance(relation);
      relationInstance.ontologyInstance=this.ontologyInstance;
      this.relationshipsSelected.push(relationInstance);
      } else {
      this.relationshipsSelected.forEach((item, index) => {
        if (item.label.toLowerCase() === relation.label.toLowerCase()) this.relationshipsSelected.splice(index, 1);
      });
    }
  }

  selectType(prop, event) {
    prop.type = event.target.value;
  }

  // selectType(prop, event) {
  //   prop.types.forEach((t, index) => {
  //     if (t.toLowerCase() === event.detail.toLowerCase())
  //       prop.types.splice(index, 1);
  //   });
  //   prop.types.unshift(event.detail);
  //   prop.type = event.detail;
  // }

  handleNewRelationship(event) {
    if (event && event.label != null) {
      this.relationshipsSelected.forEach((item, index) => {
        if (item.label.toLowerCase() === event.label.toLowerCase()) item.relationPersisted = event.semanticRelationship;
      });
    }
  }

  assignRelationship(event){
    if(event && event.label!=null){
      this.relationshipsSelected.forEach((item, index) => {
        if (item.label.toLowerCase() === event.label.toLowerCase()) item.searchRelationship=false;
      });
    }
  }
  searchRelationship(event) {
    if (event && event.label != null) {
      this.relationshipsSelected.forEach((item, index) => {
        if (item.label.toLowerCase() === event.label.toLowerCase()){
          item.searchRelationship = true;
          item.properties=new Array<any>();
        }  
      });
    }

  }
  handlePropertieValidation(event) {

  }
}
  

