import { SchemeUtils } from './../../../utils/schema-utils';
import { HeaderService } from './../../../services/sharedData/header.service';
import { SemanticModelService } from './../../../services/semantic-model/semantic-model.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-search-semantic-relationship',
  templateUrl: './search-semantic-relationship.component.html',
  styleUrls: ['./search-semantic-relationship.component.scss']
})
export class SearchSemanticRelationshipComponent implements OnInit {
  @ViewChild('showRelationshipDetails') showRelationshipDetails;
  @Input() public mark = null;
  @Input() public layerName = null;
  @Input() public schemeType = null;
  @Input() public relationship = null

  @Output() public createType = new EventEmitter<Boolean>();
  @Output() public schemeComplete = new EventEmitter<any>();
  @Output() public createRelation = new EventEmitter<any>();
  @Output() public createRelationType = new EventEmitter<any>();
  searchRelationshipList: any;
  semanticItemSelected: any;
  enableModal=false;
  itemView={name:'',type:''};
  relationSaved = false;
  constructor(private semanticModelService: SemanticModelService,
    private headerService: HeaderService,
    private changeDetector: ChangeDetectorRef) { }
 

  ngOnInit() {
    this.setHeader();
    if (this.relationship){
      this.schemeType = "schema:" + SchemeUtils.extractAllPrefix(this.relationship.type);
      console.log(this.schemeType);
      if(this.relationship.model!=''){
        this.itemView.type = this.relationship.model['@type'];
        this.itemView.name = this.relationship.model['schema:name'];
      }
    }
  }
  itemChange(event){
    this.enableModal=true;
   // this.semanticItemSelected=event;
    this.itemView.type = this.semanticItemSelected['@type'];
    this.itemView.name = this.semanticItemSelected['schema:name'];
    this.confirm();
    this.changeDetector.detectChanges();
  }
  save(){
    this.schemeComplete.emit(this.semanticItemSelected);
  }


  moreDetails(){
    this.showRelationshipDetails.openModal();
  }
  selectItem(item) {
    this.semanticModelService.getEntity(item.entityId.value, false).subscribe(response => {
      this.semanticItemSelected = response;
    });
  }
  createNewElement() {
    this.createType.emit(true);
   // will ecxit from yhis component
  }

  createNewRelation() {
    this.createRelationType.emit({name:this.relationship.name});
  }
  removeRelationship(){
    this.semanticItemSelected = null;
    this.relationship.model = this.semanticItemSelected;
    this.createRelation.emit({ semanticRelationship: this.relationship });
    this.itemView = { name: '', type: '' };
    this.relationSaved = false;
  }
  confirm() {
    this.relationSaved=true;
    this.relationship.model = this.semanticItemSelected;
    this.createRelation.emit({ semanticRelationship: this.relationship });

  }
  setHeader() {
    this.headerService.headerParagraph = this.layerName;
    this.headerService.headerSubparagraph = null;
    this.headerService.header = "Nueva Marca";
    this.headerService.showDetails = false;
    this.headerService.headerStep = true;
    this.headerService.stepNumber = 1;
  }
  handleResponseComponent(event){
    if (event.schema_type!=''){
      this.schemeComplete.emit(event);
    }else{
      this.semanticItemSelected=null;
    }

  }

}
