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
  constructor(private semanticService: SemanticModelService) {}

  selectPropertie(propertie, $event) {
    console.log(propertie);
    console.log($event);
    if (propertie.selected) {
      console.log("pusheamos");
      this.propertiesSelected.push({ name: propertie.name, value: '', model: '' });
      console.log(this.propertiesSelected);
    }else{
      this.propertiesSelected.forEach((item, index) => {
        if (item.name.toLowerCase() === propertie.name.toLowerCase()) this.propertiesSelected.splice(index, 1);
      });
    }
    console.log(this.propertiesSelected);
  }
  
  ngOnChanges(changes){
    console.log("OnChanges");
    console.log(changes);
    if (changes.mark.currentValue){
      if (changes.mark.currentValue.semanticContribution == null) {
        this.semanticService.getAllTypes().then(result => {
          console.log("resultado desde el then desde el componente"); console.log(result);
          this.loader = false;
          this.schemas = result.children;
          this.showSelectSchema = true;
          console.log(this.semanticContribution);
        });
      } else {
        this.getSemanticContribution();
        this.loader = false;
        this.showSelectSchema = false;
        this.showGeneratedScheme = true;
      }
    }
  }
  ngOnInit() {
    if (this.mark.semanticContribution==null){
      this.semanticService.getAllTypes().then(result => {
        console.log("resultado desde el then desde el componente"); console.log(result);
        this.loader = false;
        console.log(result);
        this.parents.push(result);
        console.log(this.schemas);
        this.schemas = result.children;
        this.parents.push();
        this.showSelectSchema = true;
        console.log(this.semanticContribution);
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
      console.log(this.mark.semanticContribution);
      this.schema_type = this.mark.semanticContribution.schema_type;
      this.propertiesSelected = new Array<any>();
      let sContribution = JSON.parse(this.mark.semanticContribution.text);
      for (let key in sContribution) {
        if(key!="@context"){
          const item = sContribution[key];
          console.log(key); console.log(item);
          this.propertiesSelected.push({ name: key, value: item, model: item });
        }
      }
      this.semanticContribution = this.mark.semanticContribution;
      console.log(this.semanticContribution);
    } else {
      console.log("la marca es nula");
    }

  }

  selectType(event){
    console.log("select type");
    console.log(event);
    console.log(this.scheme);
    this.parents.push(this.scheme);
    console.log(this.parents);
    this.schemas = this.scheme.children;
  }
  selectSchema(){
    console.log(this.scheme);

    this.schema_type = 'https://schema.org/' + this.scheme.name;
    this.properties =new Array<any>();
    this.propertiesSelected = new Array<any>();
    this.semanticService.getType(this.scheme.name).then(result => {
      console.log("resultado desde el then desde el componente");
      console.log(result);
      let properties = result['@graph'];
      let aux = new Array<any>();
      for (var prop in properties) {
        if (properties[prop]['@type']) {
          this.properties.push({ name: properties[prop]['rdfs:label'], type: properties[prop]['@type'], selected: false })
        }
      }

      console.log("propiedades rescatadas");
      console.log(this.properties);
      this.showSelectSchema=false;
      this.showPropertiesSelection=true;
    });
  }

  generateScheme() {
    console.log("finished");
    console.log(this.schemeComplete);
    this.showPropertiesSelection=false;
    this.showCompleteForm=true;
  }
  
  saveScheme(){
    console.log("guardar esquema");
    let e = this.semanticService.generateCompacted(this.propertiesSelected).then(
      function (success) {
        console.log("Compacted from component");
        console.log(success);
        //console.log(component);
        return success;
      }
    );
    e.then(
      result => {
        console.log("resultado desde el then desde el componente"); console.log(result);
        console.log("Compacted from component");
        console.log(result);
        //console.log(component);
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
    console.log(step);
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
