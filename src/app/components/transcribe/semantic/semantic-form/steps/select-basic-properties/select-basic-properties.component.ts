import { SemanticUtils } from './../../../../../../utils/semantic-utils';
import { ontologyClassInstance } from '../../../../../../models/ontology/instance/ontologyClassInstance';
import { DataPropertieValue } from '../../../../../../models/ontology/instance/dataPropertieValue';
import { DataPropertie } from '../../../../../../models/ontology/class/dataPropertie';
import { SemanticModelService } from '../../../../../../services/semantic-model/semantic-model.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-select-basic-properties',
  templateUrl: './select-basic-properties.component.html',
  styleUrls: ['./select-basic-properties.component.scss']
})
export class SelectBasicPropertiesComponent implements OnInit, OnChanges {

  @ViewChild('modalAddPropertieBasic') modalAddPropertieBasic;
  @Input() notifyNextStep = false;
  @Input() properties: Array<DataPropertie>;
  @Input() ontologyInstance: ontologyClassInstance;
  @Output() public basicPropertieGenerated = new EventEmitter<ontologyClassInstance>();
  @Output() public validatePropertiesEvent = new EventEmitter<any>();
  propertiesSelected: Array<DataPropertieValue>;
  searchText: any;
  searchTextFilter:any;
  public loader=true;
  public validationMap = new Map();
  public relationships = new Array<any>();
  

  constructor(private changeDetector: ChangeDetectorRef,
              private semanticService: SemanticModelService) {}


  ngOnChanges(changes) {
    if (changes.notifyNextStep && changes.notifyNextStep.currentValue) {
      this.generateBasicModel();
    }
    if (changes.ontologyInstance){
      if (!changes.ontologyInstance.previousValue || (changes.ontologyInstance.previousValue.name != changes.ontologyInstance.currentValue.name)){
        if (this.ontologyInstance != null && this.ontologyInstance.name != null) {
          this.getBasicProperties();
        }
      }
    }
  }

  ngOnInit() {}

  handleInputChange(event) {
    this.validationMap.set(event.model.name, event.valid);
    this.validateProperties();
  }

  validateProperties(){
    let found = false;
    this.validationMap.forEach((value,key) => {
      if(!value){
        found=true;
      }
    });
    if(found){
      this.validatePropertiesEvent.emit(false);
    }else{
      this.validatePropertiesEvent.emit(true);
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
        this.validationMap.set(propertie.name,false);
      }
    } else {
      this.removePropertie(propertie);
    }
    this.validateProperties();
  }
 
  public openModalSelectPropertie(){
    this.modalAddPropertieBasic.openModal();
  }
  refresh(){
    this.searchTextFilter=this.searchText;
    this.changeDetector.detectChanges();
  }

  // 
  setRequiredDataPropertie(){
    let labelProp = new DataPropertie({
      name:'label',
      label:'label',
      comment:'Ingrese un label',
      ontologyClass: this.ontologyInstance.ontologyClass,
    });
    let labelPropValue = new DataPropertieValue(labelProp);
    labelPropValue.canDelete = false;
    labelPropValue.type = 'Text';
    this.propertiesSelected.push(labelPropValue);
    this.validationMap.set(labelPropValue.name, false);
  }

  getBasicProperties(){
    this.loader = true;
    this.properties = new Array<DataPropertie>();
    this.propertiesSelected = this.ontologyInstance.properties;
    this.setRequiredDataPropertie();
    let param = { class: this.ontologyInstance.name,ontology_id:this.ontologyInstance.ontologyClass.ontology.id};
    this.semanticService.getBasicProperties(param).subscribe(result => {
      let properties = result;
      let propertiesClass = new Array<DataPropertie>();
      properties.forEach(prop => {
        propertiesClass.push(new DataPropertie(prop));
      });
      this.properties = SemanticUtils.sortProperties(propertiesClass);
      this.loader=false;
    });
  }
  generateBasicModel() {
    this.ontologyInstance.properties=this.propertiesSelected;
    this.basicPropertieGenerated.emit(this.ontologyInstance);
  }
}

