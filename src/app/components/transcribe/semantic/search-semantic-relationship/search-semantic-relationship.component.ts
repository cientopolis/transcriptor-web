import { SchemeUtils } from '../../../../utils/schema-utils';
import { HeaderService } from '../../../../services/sharedData/header.service';
import { SemanticModelService } from '../../../../services/semantic-model/semantic-model.service';
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
  @Input() public enableheader = true
  
  @Output() public deleteRelation = new EventEmitter<any>();
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

    if(this.enableheader){
      this.setHeader();
    }
    $('#delete').click(function (e) { e.stopPropagation(); });
    if (this.relationship){
      this.schemeType = this.relationship.type;
      this.itemView.type = this.relationship.type;
      this.itemView.name = this.relationship.label;
    }

    
  }
  deleteRelationship() {
     this.deleteRelation.emit({ label: this.relationship.label });
  }
  itemChange(event){
    this.enableModal=true;
    if (Array.isArray(this.semanticItemSelected['@type'])){
      this.itemView.type = this.semanticItemSelected['@type'][0];
    }else{
        this.itemView.type = this.semanticItemSelected['@type'];
    }
    this.itemView.name = this.semanticItemSelected['rdfs:label'];
    this.confirm();
    this.changeDetector.detectChanges();
  }

  detectChanges(event){
    this.changeDetector.detectChanges();
  }
  save(){
    this.schemeComplete.emit(this.semanticItemSelected);
  }


  moreDetails(){
    this.showRelationshipDetails.openModal();
  }
  selectItem(item) {
    this.semanticModelService.getEntity(item.entityId, false).subscribe(response => {
      this.semanticItemSelected = response;
    });
  }
  createNewElement() {
    this.createType.emit(true);
   // will ecxit from yhis component
  }

  createNewRelation() {
    this.createRelationType.emit({label:this.relationship.name});
  }
  removeRelationship(){
    this.semanticItemSelected = null;
    this.relationship.relationPersisted = this.semanticItemSelected;
    this.createRelation.emit({ semanticRelationship: this.relationship });
    this.itemView = { name: '', type: '' };
    this.relationSaved = false;
  }
  confirm() {
    this.relationSaved=true;
    this.relationship.relationPersisted = this.semanticItemSelected;
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
