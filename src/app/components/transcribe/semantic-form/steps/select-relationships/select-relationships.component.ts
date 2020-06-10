import { SchemeUtils } from './../../../../../utils/schema-utils';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-select-relationships',
  templateUrl: './select-relationships.component.html',
  styleUrls: ['./select-relationships.component.scss']
})
export class SelectRelationshipsComponent implements OnInit,OnChanges {
  @ViewChild('modalAddRelationPropertie') modalAddRelationPropertie;
  relationships =new Array<any>();
  @Input() properties = new Array<any>();
  @Input() schemeName: String;
  relationshipsSelected = new Array<any>();
  @Output() public relationshipGenerated = new EventEmitter<any>();
  @Input() notifyNextStep = false;
  level = 0;
  searchText:String;
  basicTypes = ['Time', 'Text', 'Date', 'Boolean', 'DateTime', 'Number', 'measuredValue'];
  constructor() { 
    this.basicTypes = SchemeUtils.basicTypes;
  }

  ngOnChanges(changes) {
    if (changes.notifyNextStep && changes.notifyNextStep.currentValue) {
      this.generateSchemeRelationships();
    } 
    if (changes.properties && changes.properties.currentValue) {
      this.relationships = new Array<any>();
      this.relationshipsSelected= new Array<any>();
      this.processProperties(changes.properties.currentValue);
    }
  }
  ngOnInit() {
    //this.processProperties(this.properties);
  }
  public openModalSelectRelarionship() {
    this.modalAddRelationPropertie.openModal();
  }

  handleScheme(event){
    this.relationshipsSelected.forEach(relationship => {
      if (event.propertieName == relationship.name) {
        relationship.scheme = event.propertiesSelected;
      }
    })
  }
  generateSchemeRelationships(){
    this.relationshipGenerated.emit({
      relationshipsSelected: this.relationshipsSelected
    });
  }
  
  getRelationship(propertie, ranges, relationship) {
    var types = new Array();
    var relationTypes = new Array();
    var name = propertie.name;
    ranges.forEach(range => {
      var res = range;
      if (!this.basicTypes.includes(res)) {
        relationTypes.push(res);
      }
    });

    if (relationTypes.length > 0) {
      relationship.push({ name: name, description: propertie.comment, types: relationTypes, type: relationTypes[0], id: name + Date.now(), selected: false } );
    }
  }

  hasRanges(properties,prop){
    return (properties[prop]['@type'] != "rdfs:Class" && properties[prop]['schema:rangeIncludes']);
  }
  processProperties(properties) {
    properties.forEach(propertie => {
      let label = propertie.label;
      let propertieId = propertie.id;
      let ranges = propertie.types;
      if (label != null) {
        if (ranges != null && ranges.length) {
          this.getRelationship(propertie, ranges, this.relationships);
        }
      }  
    });

}

  proccessScheme(event){
    console.log('event received from select-relationship');
    console.log(event);
  }
/*
  getRelationship(propertie, ranges, relationship) {
    var types = new Array();
    var relationTypes = new Array();
    var name = propertie['@id'].slice(18, propertie['@id'].length);
    ranges.forEach(element => {
      var res = element['@id'].slice(18, element['@id'].length);
      if (!this.basicTypes.includes(res)) {
        relationTypes.push(res);
      }
    });

    if (relationTypes.length > 0) {
      //      relationships.push({ name: properties[prop]['@id'].split(':')[1], description: properties[prop]['rdfs:comment'] });
      relationship.push({ name: name, description: propertie['http://www.w3.org/2000/01/rdf-schema#comment'][0]['@value'], types: relationTypes, type: relationTypes[0], id: name + Date.now(), selected: false } );

    }


  }
  processProperties(properties) {
    for (var prop in properties) {
      let propertie = properties[prop];
      let label = propertie['http://www.w3.org/2000/01/rdf-schema#label'];
      let propertieId = properties['@id'];
      let ranges = propertie['http://schema.org/rangeIncludes'];
      if (label != null) {
        label = propertie['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value'];
        if (ranges != null && ranges.length) {

          this.getRelationship(propertie, ranges, this.relationships);
        }
      }
    }
}

processProperties(properties) {
    for (var prop in properties) {
        if (this.hasRanges(properties,prop)) {
            let types = new Array<any>();
            if (properties[prop]['schema:rangeIncludes'] != null && properties[prop]['schema:rangeIncludes'].length) {
              properties[prop]['schema:rangeIncludes'].forEach(element => {
                if (!this.basicTypes.includes(element['@id'].split(':')[1])){
                  types.push(element['@id'].split(':')[1]);
                }
              });
            } else {
              if (!this.basicTypes.includes(properties[prop]['@id'].split(':')[1])) {
                types.push(properties[prop]['schema:rangeIncludes']['@id'].split(':')[1]);
              }
            }
            if (types.length > 0) {
              this.relationships.push({ name: properties[prop]['@id'].split(':')[1], types: types, type: types[0], selected: false, description: properties[prop]['rdfs:comment'] });
            }
          }
        }
    } */

  selectPropertie(propertie, $event) {
    if (propertie.selected) {
      if (propertie.types.length > 0 && !this.basicTypes.includes(propertie.types[0])) {
        this.relationshipsSelected.push({ name: propertie.name, value: '', model: '', type: propertie.types[0], scheme: new Array<any>(), properties: new Array<any>(), searchRelationship:true });
       // this.prepareSchemeBuilder(propertie.types[0], propertie.name);
      } else {
        if (propertie.types.length > 0) {
          this.relationshipsSelected.push({ name: propertie.name, value: '', model: '', type: propertie.types[0], scheme: null, properties: null, searchRelationship: true});
        }
      }
    } else {
      this.relationshipsSelected.forEach((item, index) => {
        if (item.name.toLowerCase() === propertie.name.toLowerCase()) this.relationshipsSelected.splice(index, 1);
      });
    }
  }

  selectType(prop, event) {
    prop.types.forEach((t, index) => {
      if (t.toLowerCase() === event.detail.toLowerCase())
        prop.types.splice(index, 1);
    });
    prop.types.unshift(event.detail);
    prop.type = event.detail;
  }


  handleNewRelationship(event) {
    console.log(event);
    
    if (event && event.name != null) {
      this.relationshipsSelected.forEach((item, index) => {
        if (item.name.toLowerCase() === event.name.toLowerCase()) item = event.semanticRelationship;
      });
    }
    console.log(this.relationshipsSelected);

  }
  assignRelationship(event){
    console.log(event);
    if(event && event.name!=null){
      this.relationshipsSelected.forEach((item, index) => {
        if (item.name.toLowerCase() === event.name.toLowerCase()) item.searchRelationship=false;
      });
    }

  }
}
  

