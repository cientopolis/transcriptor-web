import { HeaderService } from './../../../../services/sharedData/header.service';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-semantic-transcription-details',
  templateUrl: './semantic-transcription-details.component.html',
  styleUrls: ['./semantic-transcription-details.component.scss']
})
export class SemanticTranscriptionDetailsComponent implements OnInit,OnChanges {

  @Input() markSelected = null;
  @Input() showPreviousSave = false;
  @Input() relation = false;
  @Output() cancelEvent = new EventEmitter<any>();

  semanticContributions = null;
  relationship = new Array<any>(); 
  properties = new Array<any>();
  constructor(private headerService: HeaderService) {

  }

  ngOnChanges(changes){
    console.log(changes);
    console.log(this.markSelected);
    console.log(this.markSelected);
    console.log(this.showPreviousSave);
    if (!this.showPreviousSave) {
      if (!this.headerService.showDetails) {
        this.headerService.headerParagraph = 'Hechos Históricos / Detalle de Marca';
        this.headerService.headerSubparagraph = null;
        this.headerService.header = this.markSelected.name;
        console.log(this.headerService.header);
        this.headerService.showDetails = true;
      }
      this.semanticContributions = this.markSelected.semanticContribution;
    } else {
      this.semanticContributions = this.getMarks(this.markSelected);
    }
    this.semanticContributions.forEach(element => {
      if (!element.isArray && !element.scheme) {
        this.properties.push(element);
      } else {
        //element.name = element.model['name'];
        element.semanticContribution = element.model;
        //element.schema_type=element.name;
        this.relationship.push(element);
      }
    });
    /*
    this.semanticContributions = this.markSelected.semanticContribution;
    this.semanticContributions.forEach(element => {
        if(!element.isArray){
        this.properties.push(element);
      }else{
        element.name = element.model['name'];
        element.semanticContribution=element.model;
        this.relationship.push(element);
      }
    });
    console.log(this.relationship);

    */
  }
  cancel(){
    
    this.headerService.showDetails = false;
    this.cancelEvent.emit();
  }
  ngOnInit() {

  }


  getMarks(mark) {
    let semanticContributions= new Array<any>();
    if (mark && mark.semanticContribution) {
      mark.schema_type = mark.semanticContribution.schema_type;
      let propertiesSelected = new Array<any>();
      console.log(mark);
      let sContribution = mark.semanticContribution.text;
      for (let key in sContribution) {
        if (key != "@context") {
          const item = sContribution[key];

          if (key.includes("schema")) {
            console.log("key post if schema");
            console.log(key);
            //necesitamos persistir el tipo de esquema de la relacion
            const context = sContribution['@context'];
            let s_type = null;
            for (let c in context) {
              console.log(c);
              if ('http://schema.org/' + c == key) {
                s_type = context[c];
              }
            }
            let propOfScheme = new Array<any>();
            for (let i in item) {
              propOfScheme.push({ name: i, value: item[i], model: item[i] });
            }
            propertiesSelected.push({ name: key, value: propOfScheme, model: propOfScheme, isArray: true, schema_type: s_type });

          } else {
            if (key == "name") {
              mark.name = item
            }
            propertiesSelected.push({ name: key, value: item, model: item, isArray: false, schema_type: null });
          }
        }
      }
      mark.semanticContribution = propertiesSelected;
      console.log(mark);
      semanticContributions.push(mark);
    }
    return mark.semanticContribution;
  }
}
