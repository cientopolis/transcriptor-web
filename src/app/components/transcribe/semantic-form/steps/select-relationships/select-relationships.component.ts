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
  constructor() { }

  ngOnChanges(changes) {
    if (changes.notifyNextStep && changes.notifyNextStep.currentValue) {
      
      this.generateSchemeRelationships();
    } 
    if (changes.properties && changes.properties.currentValue) {
      console.log("changues relationship");
      this.relationships = new Array<any>();
      this.relationshipsSelected= new Array<any>();
      console.log(changes.properties.currentValue);
      this.processProperties(changes.properties.currentValue);
    }
  }
  ngOnInit() {
    console.log(this.properties);
    console.log("on init");
    //this.processProperties(this.properties);

  }
  public openModalSelectRelarionship() {
    console.log(this.relationshipsSelected);
    console.log("open modal");
    this.modalAddRelationPropertie.openModal();
  }

  handleScheme(event){
    console.log(event);
    console.log(this.relationshipsSelected);

    this.relationshipsSelected.forEach(relationship => {
      if (event.propertieName == relationship.name) {
        relationship.scheme = event.propertiesSelected;
      }
    })

    console.log(this.relationshipsSelected);



  }
  generateSchemeRelationships(){
    this.relationshipGenerated.emit({
      relationshipsSelected: this.relationshipsSelected
    });
  }
  

  hasRanges(properties,prop){
    return (properties[prop]['@type'] != "rdfs:Class" && properties[prop]['schema:rangeIncludes']);
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
        console.log(this.relationships);
    }

  selectPropertie(propertie, $event) {
    console.log(propertie);
    console.log($event);
    if (propertie.selected) {
      if (propertie.types.length > 0 && !this.basicTypes.includes(propertie.types[0])) {
        console.log(propertie.types[0]);
        this.relationshipsSelected.push({ name: propertie.name, value: '', model: '', type: propertie.types[0], scheme: new Array<any>(), properties: new Array<any>() });
       // this.prepareSchemeBuilder(propertie.types[0], propertie.name);
      } else {
        if (propertie.types.length > 0) {
          this.relationshipsSelected.push({ name: propertie.name, value: '', model: '', type: propertie.types[0], scheme: null, properties:null});
        }
      }
    } else {
      this.relationshipsSelected.forEach((item, index) => {
        if (item.name.toLowerCase() === propertie.name.toLowerCase()) this.relationshipsSelected.splice(index, 1);
      });
    }
    console.log(this.relationshipsSelected);
  }

  selectType(prop, event) {
    console.log(prop);
    console.log(event);
    prop.types.forEach((t, index) => {
      if (t.toLowerCase() === event.detail.toLowerCase())
        prop.types.splice(index, 1);
    });
    prop.types.unshift(event.detail);
    prop.type = event.detail;
  }
}
  

