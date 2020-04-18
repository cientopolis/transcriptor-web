import { Mark } from './../../../../models/mark';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-semantic-marks',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListSemanticMarksComponent implements OnInit {
  @Input() renderedMarks = null;
  semanticContributions:Mark[] = [];
  constructor() { }

  ngOnInit() {
    this.extractContributions(this.renderedMarks);
  }

  extractContributions(renderedMarks) {
    renderedMarks.forEach(renderedMark => {
      this.getMarks(renderedMark.mark);
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
            let propOfScheme = new Array<any>();
            for (let i in item) {
              propOfScheme.push({ name: i, value: item[i], model: item[i] });
            }
            propertiesSelected.push({ name: key, value: propOfScheme, model: propOfScheme, isArray: true });

          }else{
            propertiesSelected.push({ name: key, value: item, model: item,isArray:false });
          }
        }
      }
      mark.semanticContribution=propertiesSelected;
      this.semanticContributions.push(mark);
    } 
  }

}
