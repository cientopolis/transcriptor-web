import { SemanticModelService } from './../../../services/semantic-model/semantic-model.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-semantic-form',
  templateUrl: './semantic-form.component.html',
  styleUrls: ['./semantic-form.component.scss']
})
export class SemanticFormComponent implements OnInit {
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
  @Output() public schemeComplete = new EventEmitter<any>();

  constructor(private semanticService: SemanticModelService) {}

  selectPropertie(propertie, $event) {
    console.log(propertie);
    console.log($event);
    if (propertie.selected) {
      console.log("pusheamos");
      this.propertiesSelected.push({ name: propertie.name, value: '', model: '' });
      console.log(this.propertiesSelected);
    }
  }

  ngOnInit() {
    this.semanticService.getAllTypes().then(result => {
      console.log("resultado desde el then desde el componente"); console.log(result);
      this.loader=false;

      this.schemas = result.children;
      this.showSelectSchema=true;
    });
  }
  selectSchema(){
    console.log(this.scheme);
    this.schema_type = 'https://schema.org/' + this.scheme;
    this.properties =new Array<any>();
    this.propertiesSelected = new Array<any>();
    this.semanticService.getType(this.scheme).then(result => {
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
        this.schema_type
        this.schemeComplete.emit({ schema_type: this.schema_type, semantic_text:result} );
        return result;

      }
    );
    console.log(e);
  }


}
