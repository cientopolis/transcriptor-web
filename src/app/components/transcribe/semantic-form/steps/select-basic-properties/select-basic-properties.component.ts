import { SchemaPropertie } from './../../../../../models/scheme/propertie';
import { SchemeUtils } from './../../../../../utils/schema-utils';
import { SemanticModelService } from './../../../../../services/semantic-model/semantic-model.service';

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-select-basic-properties',
  templateUrl: './select-basic-properties.component.html',
  styleUrls: ['./select-basic-properties.component.scss']
})
export class SelectBasicPropertiesComponent implements OnInit, OnChanges {

  @ViewChild('modalAddPropertieBasic') modalAddPropertieBasic;
  @Input() properties: Array<any>;
  @Input() schemeName: String;
  @Input() propertieName: String;
  @Input() notifyNextStep = false;
  @Input() propertiesSelected: Array<any>;
  @Output() public schemeGenerated = new EventEmitter<any>();
  @Output() public validatePropertiesEvent = new EventEmitter<any>();
  level=0;
  propertieNameTitle: String;
  sublevel = false;
  searchText: any;
  searchTextFilter:any;
  public loader=true;

  public validationMap = new Map();

  public relationships = new Array<any>();

  basicTypes = ['Time', 'Text', 'Date', 'Boolean', 'DateTime', 'Number', 'measuredValue'];
  constructor(private changeDetector: ChangeDetectorRef,private semanticService: SemanticModelService) { 
    this.basicTypes= SchemeUtils.basicTypes;
  }


  ngOnChanges(changes) {
    if (changes.notifyNextStep && changes.notifyNextStep.currentValue) {
      this.generateScheme();
    }
    if (changes.propertiesSelected && changes.propertiesSelected.currentValue) {
      this.level = this.level - 1;
      if (this.propertiesSelected == null) {
        this.propertiesSelected = new Array<any>();
      }
      if (this.schemeName != null) {
        this.getSchema(this.schemeName);
      }
      if (this.propertieName != null) {
        this.propertieNameTitle = this.propertieName;
      }
    }
  }
  ngOnInit() {

  }

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

  prepareSchemeBuilder(scheme, name) {
    if (!this.basicTypes.includes(scheme)) {
      this.schemeName = scheme;
      this.sublevel = true;
      this.propertieName = name;
    }
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
      if (propertie.types.length > 0 && !this.basicTypes.includes(propertie.types[0])) {
        this.propertiesSelected.push({ name: propertie.name, value: '', model: '', type: propertie.types[0], scheme: null, canDelete: true });
        this.prepareSchemeBuilder(propertie.types[0], propertie.name);
        this.validationMap.set(propertie.name,false);
      } else {
        if (propertie.types.length > 0) {
          this.validationMap.set(propertie.name, false);
         
          this.propertiesSelected.push({ name: propertie.name, value: '', model: '', type: propertie.types[0], scheme: null, canDelete: true });
        }
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

  getSchema(name) {
    this.loader=true;
    let schema_type = 'http://schema.org/' + name;
    this.properties = new Array<any>();
    this.propertiesSelected = new Array<any>();
    this.semanticService.getType(name).then(result => {
      /* let properties = result['@graph']; */
      let properties = result;
 //     properties = SchemeUtils.getPropertiesForType(result,schema_type);
      this.processPropertiesLastLevel(properties);
    });
  }

  getRelationship(propertie, propertiesArray, relationship, propertiesSelected) {
    var types = new Array();
    var relationTypes = new Array();
    var name = propertie.name;
    propertie.types.forEach(type => {
      var res = type;
      if (this.basicTypes.includes(res)) {
        types.push(res);
      } else {
        relationTypes.push(res);
      }
    });
    if (types.length > 0) {
      if (name.toLowerCase() == 'name') {
        console.log('add name');
        console.log(this.schemeName);
        this.validationMap.set(name, false);
//        this.validateProperties();
        propertiesSelected.push({ name: name, value: '', model: '', type: types, scheme: null, canDelete: false });
      }else{
        propertiesArray.push({ name: name, types: types, selected: false, description: propertie.comment, id: name + Date.now() });
      }
    }
    if (relationTypes.length > 0) {
      relationship.push({ name: name, description: propertie.comment, type: relationTypes });
    }

    this.loader=false;

  }

  processPropertiesLastLevel(properties:Array<SchemaPropertie>) {
    properties.forEach(propertie =>{
      let ranges = propertie.types;
      if (propertie.label != null) {
        if (ranges != null && ranges.length) {
          this.getRelationship(propertie, this.properties, this.relationships, this.propertiesSelected);
        }
      }
    })
    this.relationships = properties;
    //this.generateScheme();
  }
  generateScheme() {
    this.schemeGenerated.emit({
      propertiesSelected: this.propertiesSelected,
      properties: this.relationships
    });
  }

  handleScheme(event) {
    this.propertiesSelected.forEach(propertie => {
      if (this.propertieName == propertie.name) {
        propertie.scheme = event;
      }
    })
    this.sublevel = false;
  }

/*  
  getRelationship(propertie, ranges, propertiesArray, relationship, propertiesSelected) {
    var types = new Array();
    var relationTypes = new Array();
    var name = propertie['@id'].slice(18, propertie['@id'].length);
    ranges.forEach(element => {
      var res = element['@id'].slice(18, element['@id'].length);
      if (this.basicTypes.includes(res)) {
        types.push(res);
      } else {
        relationTypes.push(res);
      }
    });
    if (types.length > 0) {
      //this.properties.push({ name: properties[prop]['@id'].split(':')[1], types: types, selected: false, description: properties[prop]['rdfs:comment'] });
      propertiesArray.push({ name: name, types: types, selected: false, description: propertie['http://www.w3.org/2000/01/rdf-schema#comment'][0]['@value'], id: name + Date.now() });
    }
    if (relationTypes.length > 0) {
      //      relationships.push({ name: properties[prop]['@id'].split(':')[1], description: properties[prop]['rdfs:comment'] });
      relationship.push({ name: name, description: propertie['http://www.w3.org/2000/01/rdf-schema#comment'][0]['@value'], type: relationTypes });
    }

    if (name.toLowerCase() == 'name') {
      propertiesSelected.push({ name: name, value: '', model: '', type: types, scheme: null, canDelete: false });
    }

  }

processPropertiesLastLevel(properties) {
    let relationships = new Array<any>();
    for (var prop in properties) {
      let propertie = properties[prop];
      let label = propertie['http://www.w3.org/2000/01/rdf-schema#label'];
      let propertieId = properties['@id'];
      let ranges = propertie['http://schema.org/rangeIncludes'];
      if (label != null) {
        label = propertie['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value'];
        if (ranges != null && ranges.length) {
          this.getRelationship(propertie, ranges, this.properties, this.relationships, this.propertiesSelected);
        }
      }

    }
    this.relationships = properties;
    //this.generateScheme();
  } */
/*
  processProperties(properties) {
    for (var prop in properties) {
      if (properties[prop]['@type'] != "rdfs:Class" && properties[prop]['schema:rangeIncludes']) {
        let types = new Array<any>();
        if (properties[prop]['schema:rangeIncludes'] != null && properties[prop]['schema:rangeIncludes'].length) {
          properties[prop]['schema:rangeIncludes'].forEach(element => {
            types.push(element['@id'].split(':')[1]);
          });
        } else {
          types.push(properties[prop]['schema:rangeIncludes']['@id'].split(':')[1]);
        }
        this.properties.push({ name: properties[prop]['@id'].split(':')[1], types: types, selected: false, description: properties[prop]['rdfs:comment'] });
      }
    }

  }*/
  /* processPropertiesLastLevel(properties) {
    console.log("processLastLevel");
    let relationships = new Array<any>();
    for (var prop in properties) {
      if (properties[prop]['@type'] != "rdfs:Class" && properties[prop]['schema:rangeIncludes']) {
        let types = new Array<any>();
        if (properties[prop]['schema:rangeIncludes'] != null && properties[prop]['schema:rangeIncludes'].length) {
          properties[prop]['schema:rangeIncludes'].forEach(element => {
            if (this.basicTypes.includes(element['@id'].split(':')[1])) {
              types.push(element['@id'].split(':')[1]);
            }
          });
        } else {
          if (this.basicTypes.includes(properties[prop]['schema:rangeIncludes']['@id'].split(':')[1])) {
            if (properties[prop]['@id'].split(':')[1] == 'name') {
              this.propertiesSelected.push({ name: properties[prop]['@id'].split(':')[1], value: '', model: '', type: types, scheme: null, canDelete: false });
            }
            types.push(properties[prop]['schema:rangeIncludes']['@id'].split(':')[1]);
          } else {
            this.relationships.push({ name: properties[prop]['@id'].split(':')[1], description: properties[prop]['rdfs:comment'] });
          }
        }
        if (types.length > 0) {
          this.properties.push({ name: properties[prop]['@id'].split(':')[1], types: types, selected: false, description: properties[prop]['rdfs:comment'], id: properties[prop]['@id'].split(':')[1] + Date.now().toString });
        }
      }

    }
    this.relationships = properties;
    //this.generateScheme();
  }
 */



}

