import { SemanticUtils } from './../../../../../utils/semantic-utils';
import { SemanticModelService } from './../../../../../services/semantic-model/semantic-model.service';
import { SchemeUtils } from '../../../../../utils/schema-utils';
import { HeaderService } from '../../../../../services/sharedData/header.service';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-semantic-transcription-details',
  templateUrl: './semantic-transcription-details.component.html',
  styleUrls: ['./semantic-transcription-details.component.scss']
})
export class SemanticTranscriptionDetailsComponent implements OnInit,OnChanges {
  @ViewChild('relationDetailModal') relationDetailModal;

  @Input() entityid ;
  @Input() layername= null;
  @Input() showRelationshipItem = null;
  @Input() markSelected = null;
  @Input() showPreviousSave = false;
  @Input() showCancelbutton = true;
  @Input() relation = false;
  @Input() isContribution = true;
  @Input() showheader = true;
  @Input() enableaddrelation = false;
  @Output() cancelEvent = new EventEmitter<any>();
  loader = true;
  semanticContributions = null;
  relationship = new Array<any>(); 
  properties = new Array<any>();
  parentsDetails = new Array<{name:'',type:'',propname:string,properties:any,relationships:any}>();
  nametoshow:string;
  typetoshow:string;
  propertienametoshow:string;
  showaddrelation = false;
  markrelation:any;

  constructor(private headerService: HeaderService,
    private semanticService:SemanticModelService) {

  }

  ngOnChanges(changes){
    if (!this.showPreviousSave) {
      if (!this.headerService.showDetails && this.showheader) {
        console.log(this.markSelected);
        if (this.layername){
          this.headerService.headerParagraph = this.layername + ' / Detalle de Marca';
        }
        this.headerService.headerSubparagraph = null;
        this.headerService.header = this.markSelected.name;
        this.headerService.showDetails = true;
      }
      if (this.entityid != null) {
        this.parentsDetails = new Array<{ name: '', type: '', propname: string, properties: any, relationships: any }>();
        this.resetData();
        this.getEntity();
      }
    } else {
      this.parentsDetails = new Array<{ name: '', type: '', propname: string, properties: any, relationships: any }>();
      this.resetData();
      this.loader=false;
      this.headerService.showDetails = true;
      let sContribution = this.markSelected.semanticContribution.text;
      this.semanticContributions = SemanticUtils.getFromMainEntity(this.markSelected, sContribution,true);
      this.markSelected.type = this.markSelected.semanticContribution.type;
      this.nametoshow = this.markSelected.name;
      this.typetoshow = this.markSelected.type;
    
      this.setProperties();
    }


  }

  addRelation(mark){
    console.log('add relation');
    console.log(mark);
    this.markrelation=mark;
    this.showaddrelation=true;
  }
  resetData(){
    this.semanticContributions = new Array<any>();
    this.properties = new Array<any>();
    this.relationship = new Array<any>();
  }

  getEntity(id=null,isContrubution=null){
    let entityIdParam = this.entityid;
    let isContributionParam = this.isContribution;
    if(id!=null){
      entityIdParam=id;
    }
    if (isContrubution != null){
      isContributionParam=isContrubution;
    }
    this.semanticService.getEntity(entityIdParam, true, isContributionParam).subscribe(semanticdata => {
      this.resetData();
      let properties = SemanticUtils.getFromMainEntity(this.markSelected, semanticdata, this.relation);
      this.semanticContributions = properties;
      this.nametoshow=this.markSelected.name;
      this.typetoshow=this.markSelected.type;
      if (!this.propertienametoshow){
        this.propertienametoshow=this.typetoshow;
      }

      this.setProperties();
    });;
  }


 
  setProperties(){
    this.semanticContributions.forEach(element => {
      if (!element.isArray && !element.scheme) {
        this.properties.push(element);
      } else {
        element.semanticContribution = element.model;
        this.relationship.push(element);
      }
    });
    this.loader = false;
    this.parentsDetails.push(
      {
        name:this.markSelected.name,
        propname:this.propertienametoshow,
        type:this.markSelected.type,
        properties:this.properties,
        relationships:this.relationship
      })
    }

  cancel(){
    this.headerService.showDetails = false;
    this.cancelEvent.emit();
  }
  ngOnInit() {}

  setParentDetail(parent) {
    let index = this.parentsDetails.indexOf(parent);
    if (index < this.parentsDetails.length) {
      index++;
    }
    this.parentsDetails.splice(index);
    this.resetData();
    this.properties = parent.properties;
    this.relationship = parent.relationships;
    this.nametoshow = parent.name;
    this.typetoshow = parent.type;
  }


  showDetail(relation,ispropertie=false){
    let url = null;
    if(!ispropertie){
      url = relation.model[0].model;
    
    }else{
      url = relation;
    }
    this.propertienametoshow=relation.name;
    let urlwoprefix = SemanticUtils.extractTranscriptorSchema(url);
    this.getEntity(SemanticUtils.extractTranscriptorSchema(url),false);
    
    //this.relationDetailModal.open({ semanticContribution: { text: {}, schema_type: relation.name, slug: SemanticUtils.extractTranscriptorSchema(relation.model[0].model)} },null,false)
  }
  isUrl(element){
    return SemanticUtils.isUrl(element);
  }

}
