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
  type:string;
  markView = null;
  loadedRelation=false;
  compacted:any;


  constructor(private semanticService: SemanticModelService) { }

  ngOnInit() {
    let propertie = new Array<any>();
    this.type = this.semanticItem['rdfs:label'];
    this.markView = { semanticContribution: { text: this.semanticItem, schema_type: this.type } };
    this.saveScheme();
  }
  saveScheme() {

    let e = this.semanticService.generateJsonld(null, this.semanticItem).then(
      function (success) {
        console.log(success);
        return success;
      }
    );
    e.then(
      result => {

        this.markView = { semanticContribution: { text: result['schema:mainEntity'], type: this.type } };
        this.compacted=result;
        this.loadedRelation=true;
        return result;
      }
    );
  }
  save(){
    let obj = { schema_type: this.type, semantic_text: this.compacted, contribution_slug: SchemeUtils.getSlug(this.compacted['@id']), label: this.compacted['rdfs:label'] };
    this.finished.emit(obj);

  }
  back(){
    this.finished.emit({ schema_type: ''});
  }

}
