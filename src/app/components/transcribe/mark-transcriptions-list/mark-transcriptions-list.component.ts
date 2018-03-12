import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';

import { TranscriptionService } from '../../../services/transcription/transcription.service';

@Component({
  selector: 'app-mark-transcriptions-list',
  templateUrl: './mark-transcriptions-list.component.html',
  styleUrls: ['./mark-transcriptions-list.component.scss']
})
export class MarkTranscriptionsListComponent implements OnInit {
  
  @Input() mark;
  @Input() modalOptions: Materialize.ModalOptions = {};
  @ViewChild('modal') modal;
  transcriptions = [];
  
  constructor(private transcriptionService:TranscriptionService, private changeDetector:ChangeDetectorRef) { }

  ngOnInit() {
  }
  
  open() {
    this.modal.open();
    this.loadTranscriptions();
  }
  
  loadTranscriptions() {
    this.transcriptionService.listByMark(this.mark.id, { fields: ['user']})
      .subscribe(transcriptions => {
        this.transcriptions = transcriptions;
        this.changeDetector.detectChanges();
      });
  }
}
