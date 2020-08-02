import { SemanticUtils } from './../../../../../../utils/semantic-utils';
import { RelationOntologyInstance } from './../../../../../../models/ontology/instance/relationOntologyInstance';
import { ontologyClassInstance } from './../../../../../../models/ontology/instance/ontologyClassInstance';
import { DataPropertieValue } from './../../../../../../models/ontology/instance/dataPropertieValue';
import { SchemeUtils } from '../../../../../../utils/schema-utils';
import { SemanticModelService } from '../../../../../../services/semantic-model/semantic-model.service';

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { DataPropertie } from 'app/models/ontology/class/dataPropertie';


@Component({
  selector: 'app-select-properties',
  templateUrl: './select-properties.component.html',
  styleUrls: ['./select-properties.component.scss']
})
export class SelectPropertiesComponent implements OnInit, OnChanges {

  @ViewChild('modalAddPropertie') modalAddPropertie; 
  @ViewChild('modalAddPropertieForRelationship') modalAddPropertieForRelationship;
  @Input() relationship: RelationOntologyInstance;
  @Input() propertieName: String;
  @Input() colapsible = false;
  @Input() showCancel = false;
  @Input() ontologyInstance: ontologyClassInstance;
  @Output() public deleteRelation = new EventEmitter<any>();
  @Output() public cancel = new EventEmitter<any>();
  @Output() public schemeGenerated = new EventEmitter<any>();
  @Output() public relationshipGenerated = new EventEmitter<any>();
  @Output() public validatePropertiesEvent = new EventEmitter<any>();
  properties: Array<DataPropertie>;
  propertiesSelected: Array<DataPropertieValue>;
  public validationMap = new Map();
  public validInputs = false;
  propertieNameTitle: String;
  searchText: any;
  relationSaved = false;
  public relationships = new Array<any>();
  loader=true;


  constructor(private semanticService: SemanticModelService) {}

  deleteRelarionship(){
    this.deleteRelation.emit({ label: this.relationship.label });
  }
   cancelCreatePropertie(){
     this.cancel.emit({ label: this.relationship.label});
   }
  ngOnChanges(changes) {
    if (changes.relationship) {
      if (!changes.relationship.previousValue || (changes.relationship.previousValue.label != changes.relationship.currentValue.label)) {
        if (this.relationship != null && this.relationship.label != null) {
          this.getBasicProperties();
        }
      }
    }
  }
  setRequiredDataPropertie() {
    let labelProp = new DataPropertie({
      name: 'label',
      label: 'label',
      comment: 'Ingrese un label',
      ontologyClass: this.ontologyInstance.ontologyClass,
    });
    let labelPropValue = new DataPropertieValue(labelProp);
    labelPropValue.canDelete = false;
    labelPropValue.type = 'Text';
    this.propertiesSelected.push(labelPropValue);
    this.validationMap.set(labelPropValue.name, false);
  }

  getBasicProperties() {
    this.ontologyInstance = this.relationship.ontologyInstance;
    this.loader = true;
    this.properties = new Array<DataPropertie>();
    this.propertiesSelected = new Array<DataPropertieValue>();
    this.setRequiredDataPropertie();
    let param = { class: this.relationship.type,ontology_id:this.relationship.ontologyInstance.ontologyClass.ontology.id };
    this.semanticService.getBasicProperties(param).subscribe(result => {
      let properties = result;
      let propertiesClass = new Array<DataPropertie>();
      properties.forEach(prop => {
        propertiesClass.push(new DataPropertie(prop));
      });
      this.properties = SemanticUtils.sortProperties(propertiesClass);;
      this.loader = false;
    });
  }
  ngOnInit() {
    $('#delete').click(function (e) { e.stopPropagation(); });
  }
  handleInputChange(event){
    this.relationSaved = false;
    this.validationMap.set(event.model.name, event.valid);
    this.validateProperties();
  }

  validateProperties() {
    let found = false;
    this.validationMap.forEach((value, key) => {
      if (!value) {
        found = true;
      }
    });
    if (found) {
      this.validInputs = false;
      //this.validatePropertiesEvent.emit(false);
    } else {
      this.validInputs = true;
      //this.validatePropertiesEvent.emit(true);
    }
  }

  selectType(prop, event) {
    prop.types.forEach((t, index) => {
      if (t.toLowerCase() === event.detail.toLowerCase())
        prop.types.splice(index, 1);
    });
    prop.types.unshift(event.detail);
  }
  removePropertieEvent(event){
    this.properties.forEach((item, index) => {
      if (item.name.toLowerCase() === event.model.name.toLowerCase()) this.properties[index].selected = false;
    });
    this.relationSaved = false;
    this.removePropertie(event.model);
  }
  removePropertie(propertie){
    propertie.selected = false;
    this.propertiesSelected.forEach((item, index) => {
      if (item.name.toLowerCase() === propertie.name.toLowerCase()) this.propertiesSelected.splice(index, 1);
    });
    this.validationMap.delete(propertie.name);
    this.validateProperties();
  }
  
  selectPropertie(propertie, $event) {
    if (propertie.selected) {
      if (propertie.types.length > 0) {
        propertie.ontologyClass = this.ontologyInstance.ontologyClass;
        let selectProp = new DataPropertieValue(propertie);
        this.propertiesSelected.push(selectProp);
        this.validationMap.set(propertie.name, false);
      }
    } else {
      this.removePropertie(propertie);
    }
    this.relationSaved = false;
    this.validateProperties();
  }
  public openModalForRelationship(){
    this.modalAddPropertieForRelationship.openModal();
  }
 
  public openModalSelectPropertie(){
    this.modalAddPropertie.openModal();
  }

  generateScheme() {
    this.schemeGenerated.emit({ 
      propertiesSelected: this.propertiesSelected,
      properties: this.relationships
    });
  }
  generateSchemeRelation(){
    this.relationSaved=true;
    this.relationship.properties = this.propertiesSelected;
    this.relationshipGenerated.emit({
      relationship: this.relationship
    });
  }
}

