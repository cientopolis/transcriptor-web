import { SchemeUtils } from '../../../../../utils/schema-utils';
import { HeaderService } from '../../../../../services/sharedData/header.service';
import { Mark } from '../../../../../models/mark';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-semantic-marks',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListSemanticMarksComponent implements OnInit {
  @Input() renderedMarks = null;
  @Input() public layerName = null;
  @Input() public layerDescription= null;
  semanticContributions:Mark[] = [];
  semanticContributionsSelected: Mark[]
  constructor(private headerService:HeaderService) { 
    this.headerService.header ='Hechos Historicos';
    this.headerService.headerParagraph ='Capa Semántica';
  }

  setHeaderTitle(){
    if (this.layerName) {
      this.headerService.header = this.layerName;
    } 
    if(this.layerDescription){
      this.headerService.headerParagraph=this.layerDescription;
    }
  }
  ngOnInit() {
    this.setHeaderTitle();
    this.extractContributions(this.renderedMarks);
  }

  extractContributions(renderedMarks) {
    renderedMarks.forEach(renderedMark => {
      console.log(renderedMark);
      renderedMark.label = renderedMark.mark.semanticContribution.label;
      renderedMark.name = renderedMark.label;
      renderedMark.slug = renderedMark.mark.semanticContribution.slug;
      renderedMark.type = renderedMark.mark.semanticContribution.schema_type;
      this.semanticContributions.push(renderedMark);
    });
  }
  showDetail(mark){
    this.semanticContributionsSelected = mark;
  }
  cancelShowDetail(event){
    this.setHeaderTitle();
    this.headerService.headerParagraph = 'Capa Semántica';
    this.semanticContributionsSelected = null;
  }

}
