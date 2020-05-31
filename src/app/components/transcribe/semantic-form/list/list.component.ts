import { SchemeUtils } from './../../../../utils/schema-utils';
import { HeaderService } from './../../../../services/sharedData/header.service';
import { Mark } from './../../../../models/mark';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-semantic-marks',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListSemanticMarksComponent implements OnInit {
  @Input() renderedMarks = null;
  @Input() public layerName = null;
  semanticContributions:Mark[] = [];
  semanticContributionsSelected: Mark[]
  constructor(private headerService:HeaderService) { 
    this.headerService.header ='Hechos Historicos';
    this.headerService.headerParagraph ='Capa Semántica';
    this.headerService.headerSubparagraph ='Esta capa agrupa los hechos históricos que se mencionan en esta pagina';
  }

  setHeaderTitle(){
    if (this.layerName) {
      this.headerService.header = this.layerName;
    } 
  }
  ngOnInit() {
    this.setHeaderTitle();
    this.extractContributions(this.renderedMarks);
  }

  extractContributions(renderedMarks) {
    renderedMarks.forEach(renderedMark => {
      this.getMarksAsNoteDigitalDocument(renderedMark.mark);
    });
  }

  getMarks(markParam) {
    let mark = JSON.parse(JSON.stringify(markParam));
    if (mark && mark.semanticContribution) {
      mark.schema_type = mark.semanticContribution.schema_type;
      let propertiesSelected = new Array<any>();
      let sContribution = JSON.parse(mark.semanticContribution.text);
      for (let key in sContribution) {
        if (key != "@context") {
          const item = sContribution[key];
          if(key.includes("schema")){
            //necesitamos persistir el tipo de esquema de la relacion
            const context = sContribution['@context'];
            let s_type=null;
            for (let c in context) {
              if ('http://schema.org/' + c == key){
                s_type = context[c];
              }
            }
            let propOfScheme = new Array<any>();
            for (let i in item) {
              propOfScheme.push({ name: i, value: item[i], model: item[i] });
            }
            propertiesSelected.push({ name: key, value: propOfScheme, model: propOfScheme, isArray: true, schema_type:s_type });

          }else{
            if (key == "name") {
              mark.name =item
            }
            propertiesSelected.push({ name: key, value: item, model: item, isArray: false, schema_type:null });
          }
        }
      }
      mark.semanticContribution=propertiesSelected;
      this.semanticContributions.push(mark);
    } 
  }

  getMarksAsNoteDigitalDocument(markParam) {
    let mark = JSON.parse(JSON.stringify(markParam));
    if (mark && mark.semanticContribution) {
      mark.schema_type = mark.semanticContribution.schema_type;
      let propertiesSelected = new Array<any>();
      let sContribution = JSON.parse(mark.semanticContribution.text);
      propertiesSelected = SchemeUtils.getMarksAsNoteDigitalDocument(mark,sContribution);
      
      mark.semanticContribution=propertiesSelected;
      this.semanticContributions.push(mark);
    } 
  }

  showDetail(mark){
    this.semanticContributionsSelected = mark;
  }
  cancelShowDetail(event){
    this.setHeaderTitle();
//    this.headerService.header = 'Hechos Historicos';
    this.headerService.headerParagraph = 'Capa Semántica';
    this.headerService.headerSubparagraph = 'Esta capa agrupa los hechos históricos que se mencionan en esta pagina';
    this.semanticContributionsSelected = null;
  }

}
