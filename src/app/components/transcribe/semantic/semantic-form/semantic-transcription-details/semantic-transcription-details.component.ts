import { SemanticUtils } from './../../../../../utils/semantic-utils';
import { SemanticModelService } from './../../../../../services/semantic-model/semantic-model.service';
import { SchemeUtils } from '../../../../../utils/schema-utils';
import { HeaderService } from '../../../../../services/sharedData/header.service';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-semantic-transcription-details',
  templateUrl: './semantic-transcription-details.component.html',
  styleUrls: ['./semantic-transcription-details.component.scss']
})
export class SemanticTranscriptionDetailsComponent implements OnInit,OnChanges {

  @Input() entityid ;
  @Input() showRelationshipItem = null;
  @Input() markSelected = null;
  @Input() showPreviousSave = false;
  @Input() relation = false;
  @Output() cancelEvent = new EventEmitter<any>();
  loader = true;
  semanticContributions = null;
  relationship = new Array<any>(); 
  properties = new Array<any>();
  constructor(private headerService: HeaderService,
    private semanticService:SemanticModelService) {

  }

  ngOnChanges(changes){
    if (!this.showPreviousSave) {
      if (!this.headerService.showDetails) {
        this.headerService.headerParagraph = 'Hechos Históricos / Detalle de Marca';
        this.headerService.headerSubparagraph = null;
        this.headerService.header = this.markSelected.name;
        this.headerService.showDetails = true;
      }
      if (this.entityid != null) {
        let options = { use_default_schema: false, is_contribution: true }
        this.semanticService.getEntity(this.entityid, true,true).subscribe(semanticdata => {
          console.log(semanticdata);
          let properties = SemanticUtils.getFromMainEntity(this.markSelected, semanticdata,this.relation);
          console.log('propetries extracted');
          console.log(properties);
          this.semanticContributions = properties;
          this.setProperties();
        });;
      }
    } else {
      this.semanticContributions = new Array<any>();
      this.properties = new Array<any>();
      this.relationship = new Array<any>();
      this.loader=false;
      this.headerService.showDetails = true;
      console.log(this.markSelected);

      let sContribution = this.markSelected.semanticContribution.text;
      console.log(sContribution);
      this.semanticContributions = SemanticUtils.getFromMainEntity(this.markSelected, sContribution,true);
      console.log(this.semanticContributions);
      this.markSelected.type = this.markSelected.semanticContribution.type;
      this.setProperties();
    }


  }
  setProperties(){
    this.semanticContributions.forEach(element => {
      console.log(element);
      if (!element.isArray && !element.scheme) {
        this.properties.push(element);
      } else {
        element.semanticContribution = element.model;
        this.relationship.push(element);
      }
    });
    console.log(this.relationship);
    this.loader = false;
    console.log(this.properties);
  }

  cancel(){
    this.headerService.showDetails = false;
    this.cancelEvent.emit();
  }
  ngOnInit() {

  }
  showDetail(r){

  }

  getMarks(mark) {
    let semanticContributions= new Array<any>();
    if (mark && mark.semanticContribution) {
      mark.schema_type = mark.semanticContribution.schema_type;
      let propertiesSelected = new Array<any>();
      if (mark.semanticContribution.text['schema:mainEntity']){
        mark.semanticContribution.text = mark.semanticContribution.text['schema:mainEntity'];
      }
      let sContribution = mark.semanticContribution.text;
      for (let key in sContribution) {
        if (key != "@context") {
          const item = sContribution[key];
          if (key.includes("schema")) {
            //necesitamos persistir el tipo de esquema de la relacion
            const context = sContribution['@context'];
            let s_type = null;
            for (let c in context) {
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
      semanticContributions.push(mark);
    }
    return mark.semanticContribution;
  }
}
