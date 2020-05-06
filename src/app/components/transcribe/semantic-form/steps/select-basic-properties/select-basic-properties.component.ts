import { SemanticModelService } from './../../../../../services/semantic-model/semantic-model.service';

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';


@Component({
  selector: 'app-select-basic-properties',
  templateUrl: './select-basic-properties.component.html',
  styleUrls: ['./select-basic-properties.component.scss']
})
export class SelectBasicPropertiesComponent implements OnInit, OnChanges {

  @ViewChild('modalAddPropertie') modalAddPropertie;
  @Input() properties: Array<any>;
  @Input() schemeName: String;
  @Input() propertieName: String;
  @Input() notifyNextStep = false;
  @Input() propertiesSelected: Array<any>;
  @Output() public schemeGenerated = new EventEmitter<any>();
  level=0;
  propertieNameTitle: String;
  sublevel = false;
  searchText: any;
  public relationships = new Array<any>();

  basicTypes = ['Time', 'Text', 'Date', 'Boolean', 'DateTime', 'Number', 'measuredValue'];
  constructor(private semanticService: SemanticModelService) { }


  ngOnChanges(changes) {
    console.log(changes);
    if (changes.notifyNextStep && changes.notifyNextStep.currentValue) {
      console.log("call notifi");
      this.generateScheme();
    } else {

    
    }
    if (changes.propertiesSelected && changes.propertiesSelected.currentValue) {
      this.level = this.level - 1;
      if (this.propertiesSelected == null) {
        this.propertiesSelected = new Array<any>();
      } else {
        console.log(this.propertiesSelected);
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
  }
  selectPropertie(propertie, $event) {
    if (propertie.selected) {
      if (propertie.types.length > 0 && !this.basicTypes.includes(propertie.types[0])) {
        this.propertiesSelected.push({ name: propertie.name, value: '', model: '', type: propertie.types[0], scheme: null, canDelete: true });
        this.prepareSchemeBuilder(propertie.types[0], propertie.name);
      } else {
        if (propertie.types.length > 0) {
          this.propertiesSelected.push({ name: propertie.name, value: '', model: '', type: propertie.types[0], scheme: null, canDelete: true });
        }
      }
    } else {
      this.removePropertie(propertie);
    }
  }
 
  public openModalSelectPropertie(){
    this.modalAddPropertie.openModal();
  }

  getSchema(name) {
    let schema_type = 'https://schema.org/' + name;
    this.properties = new Array<any>();
    this.propertiesSelected = new Array<any>();
    this.semanticService.getType(name).then(result => {
      let properties = result['@graph'];
      this.processPropertiesLastLevel(properties);
    });
  }
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
  processPropertiesLastLevel(properties) {
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

}

