import { Component, OnInit, Input } from '@angular/core';

import { TranscribeService } from '../../../services/transcribe/transcribe.service';

@Component({
  selector: 'app-semantic-text-editor',
  templateUrl: './semantic-text-editor.component.html',
  styleUrls: ['./semantic-text-editor.component.scss']
})
export class SemanticTextEditorComponent implements OnInit {

  @Input() page = null;

  constructor(private transcribeService: TranscribeService) { }

  ngOnInit() {
  }

  save() {
    var pageTranscriptionData = {
      page: {
        source_text: this.page.source_text
      },
      save: true
    };
    this.transcribeService.save(this.page.id, pageTranscriptionData)
      .subscribe(pageTranscription => { });
  }

}
