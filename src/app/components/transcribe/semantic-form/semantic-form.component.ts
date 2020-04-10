import { SemanticModelService } from './../../../services/semantic-model/semantic-model.service';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-semantic-form',
  templateUrl: './semantic-form.component.html',
  styleUrls: ['./semantic-form.component.scss']
})
export class SemanticFormComponent implements OnInit,OnChanges {
  loader:Boolean=true;
  showSelectSchema:Boolean=false;
  showPropertiesSelection=false;
  showCompleteForm=false;
  schemas:Array<any>;
  scheme: any;
  properties:Array<any>;
  propertiesSelected: Array<any>;
  searchText:any;
  schema_type: String = null;
  showGeneratedScheme:Boolean = false;
  @Output() public schemeComplete = new EventEmitter<any>();
  @Input() public mark = null;
  semanticContribution:any;
  parents= new Array<any>();
  renderedMarksFormatted = [];
  @Input() renderedMarks = null;
  constructor(private semanticService: SemanticModelService) {}

  selectPropertie(propertie, $event) {

    if (propertie.selected) {
      this.propertiesSelected.push({ name: propertie.name, value: '', model: '' });
    }else{
      this.propertiesSelected.forEach((item, index) => {
        if (item.name.toLowerCase() === propertie.name.toLowerCase()) this.propertiesSelected.splice(index, 1);
      });
    }
  }
  
  ngOnChanges(changes){
    if (changes.mark.currentValue){
      if (changes.mark.currentValue.semanticContribution == null) {
        this.semanticService.getAllTypes().then(result => {
          this.loader = false;
          this.schemas = result.children;
          this.showSelectSchema = true;
        });
      } else {
        this.getSemanticContribution();
        this.loader = false;
        this.showSelectSchema = false;
        this.showGeneratedScheme = true;
      }
    }
  }
  
  setParent(parent){
    let index = this.parents.indexOf(parent);
    if(index<this.parents.length){
      index++;
    }
    this.scheme = parent;
    this.parents.splice(index);
    this.schemas = this.scheme.children;
  }
  ngOnInit() {
    if (this.mark.semanticContribution==null){
      this.semanticService.getAllTypes().then(result => {
        this.loader = false;
        this.parents.push(result);
        this.schemas = result.children;
        this.parents.push();
        this.showSelectSchema = true;
      });
    }else{
      this.getSemanticContribution();
      this.loader = false;
      this.showSelectSchema = false;
      this.showGeneratedScheme=true;
    }
  }

  getSemanticContribution() {
    if (this.mark.semanticContribution) {
      this.schema_type = this.mark.semanticContribution.schema_type;
      this.propertiesSelected = new Array<any>();
      let sContribution = JSON.parse(this.mark.semanticContribution.text);
      for (let key in sContribution) {
        if(key!="@context"){
          const item = sContribution[key];
          this.propertiesSelected.push({ name: key, value: item, model: item });
        }
      }
      this.semanticContribution = this.mark.semanticContribution;
    } 
  }

  selectType(event){
    this.parents.push(this.scheme);
    this.schemas = this.scheme.children;
  }
  selectSchema(){
    this.schema_type = 'https://schema.org/' + this.scheme.name;
    this.properties =new Array<any>();
    this.propertiesSelected = new Array<any>();
    this.semanticService.getType(this.scheme.name).then(result => {
      let properties = result['@graph'];
      let aux = new Array<any>();
      for (var prop in properties) {
        if (properties[prop]['@type']) {
          this.properties.push({ name: properties[prop]['rdfs:label'], type: properties[prop]['@type'], selected: false })
        }
      }

      this.showSelectSchema=false;
      this.showPropertiesSelection=true;
    });
  }

  generateScheme() {
    this.showPropertiesSelection=false;
    this.showCompleteForm=true;
  }
  
  saveScheme(){
    let e = this.semanticService.generateCompacted(this.propertiesSelected).then(
      function (success) {
        //console.log(component);
        return success;
      }
    );
    e.then(
      result => {
        this.schema_type;
        this.schemeComplete.emit({ schema_type: this.schema_type, semantic_text:result} );
        this.showCompleteForm=false;
        this.showGeneratedScheme=true;
        return result;

      }
    );
    console.log(e);
  }
  back(step){
    switch (step) {
      case "showPropertiesSelection": {
        this.showPropertiesSelection=false;
        this.showSelectSchema=true;
        break;
      }
      case "showCompleteForm": {
        this.showCompleteForm=false;
        this.showPropertiesSelection=true;
        break;
      }
      case "showGeneratedScheme": {
        this.showGeneratedScheme = false;
        this.showCompleteForm = true;
        break;
      }

    } 
  }



}
