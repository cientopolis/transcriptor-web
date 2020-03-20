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

  constructor(private transcribeService: TranscribeService, private markService: MarkService) { }

  ngOnInit() {
  }

  save() {
    // uncomment this to personalize the save behavior
    /*
    var component = this.delegate;
    var renderedMark = this.renderedMark;
    this.markService.create(this.renderedMark.mark)
      .subscribe(mark => {
        this.renderedMark.mark = mark;
        this.renderedMark.layer.on('click', function () {
          component.editing = true;
          component.fitToLayer(renderedMark.layer);
        });
        component.renderedMarks.push(this.renderedMark);
        component.reset();
      });
    */
    this.delegate.addModalMark();
  }

  cancel() {
    this.delegate.cancelModal();
  }

}
