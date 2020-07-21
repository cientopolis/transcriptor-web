import { SemanticUtils } from './../../../../utils/semantic-utils';
import { RelationOntologyClass } from './../../../../models/ontology/class/relationOntologyClass';
import { SemanticModelService } from 'app/services/semantic-model/semantic-model.service';
import { HeaderService } from './../../../../services/sharedData/header.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-relationship',
  templateUrl: './add-relationship.component.html',
  styleUrls: ['./add-relationship.component.scss']
})
export class AddRelationshipComponent implements OnInit {

  @Input() public mark:any;
  @Input() public layername:any;
  relationships = new Array<RelationOntologyClass>();
  relationselected:any;

  searchRelationshipList: any;
  semanticItemSelected: any;
  typesSelected: any;
  typeselected:any;

  constructor(private headerService:HeaderService,
              private semanticService: SemanticModelService) { }

  ngOnInit() {
    console.log(this.mark);

    this.setHeader();
    this.getRelationships();
  }

  setHeader() {
    this.headerService.header = 'Agregar una relación';
    this.headerService.headerSubparagraph = null;
    this.headerService.headerParagraph = this.layername + ' / '+ this.mark.name + ' / Agregar relación';
    this.headerService.showDetails = false;
    this.headerService.headerStep = true;
    this.headerService.stepNumber = 1;
  }

  getRelationships() {
    this.relationships = new Array<RelationOntologyClass>();
    let param = { class: this.mark.type };
    this.semanticService.getRelationships(param).subscribe(result => {
      let relations = result;
      let propertiesClass = new Array<RelationOntologyClass>();
      relations.forEach(prop => {
        propertiesClass.push(new RelationOntologyClass(prop));
      });
      this.relationships = SemanticUtils.sortProperties(propertiesClass);
      
/*       this.loader = false; */
    });
    console.log(this.relationships);
  }

  itemChange(event){
    console.log(event);
  }
  showMarkDetail(mark=null){

  }

  selectRelation(relation,event){
    console.log(relation);
    console.log(this.relationselected);
    this.typesSelected = this.relationselected.types;
    if (this.relationselected.types.length==0){
      this.typesSelected = this.relationselected.types[0];
    }else{

    }
  }

  selectType(type, event) {
    console.log(type);
    console.log(this.typesSelected);

  }

}
