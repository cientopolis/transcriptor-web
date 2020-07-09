import { SemanticModelService } from '../../../../../services/semantic-model/semantic-model.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-scheme-builder',
  templateUrl: './scheme-builder.component.html',
  styleUrls: ['./scheme-builder.component.scss']
})
export class SchemeBuilderComponent implements OnInit {
  @Input() properties: Array<any>;
  @Input() schemeName: String;
  @Input() propertieName: String;
  propertieNameTitle:String;
  @Input() level: number;
  @Output() public schemeGenerated = new EventEmitter<any>();
  sublevel=false;
  searchText: any;
  propertiesSelected = new Array();
  
  basicTypes = ['Time', 'Text', 'Date', 'Boolean', 'DateTime', 'Number','measuredValue'];
  constructor(private semanticService: SemanticModelService) { }

  ngOnInit() {
//    console.log(this.properties);
    this.level=this.level-1;
    if(this.schemeName!=null){
      this.getSchema(this.schemeName);
    }
    if (this.propertieName!=null){
      this.propertieNameTitle=this.propertieName;
    }
  }
  selectType(prop,event){
    prop.types.forEach((t, index) => {
      if (t.toLowerCase() === event.detail.toLowerCase()) 
        prop.types.splice(index, 1);
    });
    prop.types.unshift(event.detail);


//    this.propertiesSelected.push({ name: prop.name, value: '', model: '', type: propertie.types[0], scheme: null });
    //this.prepareSchemeBuilder(event.detail,prop.name);
    //aca deberia configurar los atributos


  }
  prepareSchemeBuilder(scheme,name){
    if(!this.basicTypes.includes(scheme)){
      this.schemeName=scheme;
      this.sublevel=true;
      this.propertieName=name;
    }
  }

  selectPropertie(propertie ,$event) {
    if (propertie.selected) {
      if (propertie.types.length > 0 && !this.basicTypes.includes(propertie.types[0])){
        this.propertiesSelected.push({ name: propertie.name, value: '', model: '', type: propertie.types[0], scheme: null });
        this.prepareSchemeBuilder(propertie.types[0],propertie.name);
      }else{
        if(propertie.types.length>0){
          this.propertiesSelected.push({ name: propertie.name, value: '', model: '', type: propertie.types[0], scheme: null });
        }
      }
    }else{
      this.propertiesSelected.forEach((item, index) => {
        if (item.name.toLowerCase() === propertie.name.toLowerCase()) this.propertiesSelected.splice(index, 1);
      });
    }
  }


  getSchema(name) {

    let schema_type = 'https://schema.org/' + name;
    this.properties = new Array<any>();
    this.propertiesSelected = new Array<any>();
 /*    this.semanticService.getType(name).then(result => {
      let properties = result['@graph'];
      if(this.level>0){
        this.processProperties(properties);
      }else{
        this.processPropertiesLastLevel(properties);
      }
    }); */
  }

  processProperties(properties){
    for (var prop in properties) {
      //     console.log(properties[prop]['rdfs:label']);
      //      console.log(properties[prop]['@type']);
      //ver el caso de Text para el esquema URL
      //properties[prop]['@type'] && 
      if (properties[prop]['@type'] != "rdfs:Class" && properties[prop]['schema:rangeIncludes']) {
        let types = new Array<any>();
        if (properties[prop]['schema:rangeIncludes'] != null && properties[prop]['schema:rangeIncludes'].length) {
          properties[prop]['schema:rangeIncludes'].forEach(element => {
            types.push(element['@id'].split(':')[1]);
          });
        } else {
          //            console.log(properties[prop]['schema:rangeIncludes']);
          types.push(properties[prop]['schema:rangeIncludes']['@id'].split(':')[1]);
        }
        this.properties.push({ name: properties[prop]['@id'].split(':')[1], types: types, selected: false });
      }
    }
  }
  processPropertiesLastLevel(properties) {
    for (var prop in properties) {
      if (properties[prop]['@type'] != "rdfs:Class" && properties[prop]['schema:rangeIncludes']) {
        let types = new Array<any>();
        if (properties[prop]['schema:rangeIncludes'] != null && properties[prop]['schema:rangeIncludes'].length) {
          properties[prop]['schema:rangeIncludes'].forEach(element => {
            if (this.basicTypes.includes(element['@id'].split(':')[1])){
              types.push(element['@id'].split(':')[1]);
            }
          });
        } else {
          if (this.basicTypes.includes(properties[prop]['schema:rangeIncludes']['@id'].split(':')[1])) {
            types.push(properties[prop]['schema:rangeIncludes']['@id'].split(':')[1]);
          }
        }
        if(types.length>0){
          this.properties.push({ name: properties[prop]['@id'].split(':')[1], types: types, selected: false });
        }
      }
    }
  }
  generateScheme() {
    this.schemeGenerated.emit({properties:this.propertiesSelected});
  }
  handleScheme(event){
    this.propertiesSelected.forEach(propertie => {
      if(this.propertieName==propertie.name){
        propertie.scheme=event;
      }
    })
    this.sublevel=false;
  }
}
