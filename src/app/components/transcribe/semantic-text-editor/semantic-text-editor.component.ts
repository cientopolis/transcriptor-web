import { Component, OnInit, Input } from '@angular/core';

import { TranscribeService } from '../../../services/transcribe/transcribe.service';
import { MarkService } from '../../../services/mark/mark.service';

@Component({
  selector: 'app-semantic-text-editor',
  templateUrl: './semantic-text-editor.component.html',
  styleUrls: ['./semantic-text-editor.component.scss']
})
export class SemanticTextEditorComponent implements OnInit {

  @Input() page = null;
  @Input() layer = null;
  @Input() renderedMark = null;
  @Input() delegate = null;

  semantic_text:String=null;
  schema_type:String=null;

  constructor(private transcribeService: TranscribeService, private markService: MarkService) { }

  ngOnInit() {
  }

  save() {
    // uncomment this to personalize the save behavior
    
    var component = this.delegate;
    var renderedMark = this.renderedMark;
    var mark = this.renderedMark.mark;
    console.log("Marca que voy a persistir");
    console.log(this.semantic_text);
    console.log(this.schema_type);
    mark.semantic_text = this.semantic_text;
    mark.schema_type = this.schema_type;
    console.log(mark);
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
    console.log(this.renderedMark);
    this.delegate.addModalMark();
  }
  proccessScheme(event){
    console.log("el evento recibido es");
    console.log(event);
    this.semantic_text = JSON.stringify(event.semantic_text);
    this.schema_type = JSON.stringify(event.schema_type);
   }

  cancel() {
    this.delegate.cancelModal();
  }

}
