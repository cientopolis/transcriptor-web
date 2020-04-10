import { RenderedMark } from './../../../models/renderedMark';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { TranscribeService } from '../../../services/transcribe/transcribe.service';
import { MarkService } from '../../../services/mark/mark.service';

@Component({
  selector: 'app-semantic-text-editor',
  templateUrl: './semantic-text-editor.component.html',
  styleUrls: ['./semantic-text-editor.component.scss']
})
export class SemanticTextEditorComponent implements OnInit,OnChanges {

  @Input() page = null;
  @Input() layer = null;
  @Input() renderedMark = null;
  @Input() renderedMarks = null;
  @Input() delegate = null;

  semantic_text:String=null;
  schema_type:String=null;
  showSaveButton:Boolean = false;

  semanticContribution = null;

  constructor(private transcribeService: TranscribeService, private markService: MarkService) { }

  ngOnChanges(changes) {
    console.log("OnChanges");
    console.log(changes); 
    if (changes.renderedMark){
      console.log("rendered mark s");
      console.log(this.renderedMark);
    }
  
  }
  ngOnInit() {
  
   
  }

  save() {
    // uncomment this to personalize the save behavior
    
    var component = this.delegate;
    var renderedMark = this.renderedMark;
    var mark = this.renderedMark.mark;

    mark.semantic_text = this.semantic_text;
    mark.schema_type = this.schema_type;
    /*this.markService.create(mark)
      .subscribe(mark => {
        this.renderedMark.mark = mark;
        this.renderedMark.layer.on('click', function () {
          component.editing = true;
          component.fitToLayer(renderedMark.layer);
        });
        component.renderedMarks.push(this.renderedMark);
        component.reset();
      });*/
    this.renderedMark.mark=mark;
    this.delegate.addModalMark();
  }
  proccessScheme(event){
    this.showSaveButton=true;
    this.semantic_text = JSON.stringify(event.semantic_text);
    this.schema_type = JSON.stringify(event.schema_type);
   }

  cancel() {
    this.delegate.cancelModal();
  }

}
