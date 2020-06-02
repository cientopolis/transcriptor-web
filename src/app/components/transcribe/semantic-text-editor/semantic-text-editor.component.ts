import { SemanticModelService } from './../../../services/semantic-model/semantic-model.service';
import { HeaderService } from './../../../services/sharedData/header.service';
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
  @Input() showComponent = false;

  semantic_text:String=null;
  schema_type:String=null;
  showSaveButton:Boolean = false;
  contribution_slug:string;
  semanticContribution = null;

  constructor(private transcribeService: TranscribeService,
     private markService: MarkService,
      private headerService: HeaderService,
      private  semanticModel:SemanticModelService) { }

  ngOnChanges(changes) {}
  ngOnInit() {
   /*  console.log("call types from backend")
    this.semanticModel.getFullTree(); */
  }

  save() {
    // uncomment this to personalize the save behavior
    
    var component = this.delegate;
    var renderedMark = this.renderedMark;
    var mark = this.renderedMark.mark;
    this.headerService.showDetails = true;
    mark.semantic_text = this.semantic_text;
    mark.schema_type = this.schema_type;
    mark.contribution_slug = this.contribution_slug;
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
    console.log(event);
    this.showSaveButton=true;
    this.semantic_text = JSON.stringify(event.semantic_text);
    this.schema_type = event.schema_type;
    this.contribution_slug = event.contribution_slug;

    this.save();
   }

  cancel() {

    this.delegate.cancelModal();
  }

}
