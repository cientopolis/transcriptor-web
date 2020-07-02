import { SemanticModelService } from '../../../../../services/semantic-model/semantic-model.service';
import { SchemeUtils } from '../../../../../utils/schema-utils';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-show-relationship-item',
  templateUrl: './show-relationship-item.component.html',
  styleUrls: ['./show-relationship-item.component.scss']
})
export class ShowRelationshipItemComponent implements OnInit {
  @Input() public semanticItem = null;
  @Input() public onlyShow = false;
  @Output() public finished = new EventEmitter<any>();
  schemeName:string;
  markView = null;
  loadedRelation=false;
  compacted:any;


  constructor(private semanticService: SemanticModelService) { }

  ngOnInit() {
    let propertie = new Array<any>();
    for (let key in this.semanticItem) {
      const item = this.semanticItem[key];
       //ignore la
      if (key=='@type') {
        let type = item;
        if(Array.isArray(item)){
          type = item[0];
        }
        this.schemeName = SchemeUtils.getTypeFromPrefix(type);
      }
    }
    this.saveScheme();
  }
  saveScheme() {

    let e = this.semanticService.generateCompacted(this.schemeName, this.semanticItem,false).then(
      function (success) {
        //console.log(component);
        return success;
      }
    );
    e.then(
      result => {
        let resultShow = JSON.parse(JSON.stringify(result));
        let show = resultShow['schema:mainEntity'];
        for (let key in show) {
          const item = show[key];
          if(Array.isArray(item)){
            let cont = 0;
            item.forEach(possibleRelation => {
              let hasType=false;
              for (let pkey in possibleRelation) {
                const pitem = possibleRelation[pkey];
                if (pkey=='@type'){
                  hasType=true;
                }
              };
              if(hasType){
                if(cont==0){
                  show[key] = possibleRelation;
                }else{
                  show[key + cont] = possibleRelation;
                }
                cont++;
              }
              
            });
          }
          if (Array.isArray(item['@type'])) {
            item['@type'] = item['@type'][0];
          }

        }
        this.markView = { semanticContribution: { text: resultShow, schema_type: this.schemeName } };
        this.compacted=result;
        this.loadedRelation=true;
        return result;
      }
    );
  }
  save(){
    let obj = { schema_type: this.schemeName, semantic_text: this.compacted, contribution_slug: SchemeUtils.getSlug(this.compacted['@id']) };
    this.finished.emit(obj);

  }
  back(){
    this.finished.emit({ schema_type: ''});
  }

}
