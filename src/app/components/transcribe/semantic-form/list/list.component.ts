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
    console.log("OnInit");
    console.log(this.renderedMarks);
    this.extractContributions(this.renderedMarks);
  }

  extractContributions(renderedMarks) {
    renderedMarks.forEach(renderedMark => {
      console.log(renderedMark.mark);
      this.getMarks(renderedMark.mark);
    });
    console.log(this.renderedMarks);
  }

  getMarks(markParam) {
    let mark = JSON.parse(JSON.stringify(markParam));
    if (mark && mark.semanticContribution) {
      console.log(mark.semanticContribution);
      mark.schema_type = mark.semanticContribution.schema_type;
      let propertiesSelected = new Array<any>();
      let sContribution = JSON.parse(mark.semanticContribution.text);
      for (let key in sContribution) {
        if (key != "@context") {
          const item = sContribution[key];
          console.log(key); console.log(item);
          propertiesSelected.push({ name: key, value: item, model: item });
          
        }
      }
      mark.semanticContribution=propertiesSelected;
      this.semanticContributions.push(mark);
      console.log(mark);
    } else {
      console.log("la marca es nula");
    }

  }

}
