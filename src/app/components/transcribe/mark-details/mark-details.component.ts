import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { TranscriptionService } from '../../../services/transcription/transcription.service';

@Component({
  selector: 'app-mark-details',
  templateUrl: './mark-details.component.html',
  styleUrls: ['./mark-details.component.scss']
})
export class MarkDetailsComponent implements OnInit {
  
  @Input() mark;
  @Input() modalOptions;
  @ViewChild('modal') modal; 
  @Output() close = new EventEmitter();
  @Output() successButton = new EventEmitter();
  
  constructor(private transcriptionService:TranscriptionService) { }

  ngOnInit() {
  }
  
  open() {
    this.modal.open()
  }
  
  closeModal() {
    this.close.emit();
  }
  
  onSuccessButton() {
    this.successButton.emit();
  }
  
  likeTranscription() {
    this.transcriptionService.like(this.mark.transcription.id)
      .subscribe(transcription => this.mark.transcription = transcription);
  }
}
