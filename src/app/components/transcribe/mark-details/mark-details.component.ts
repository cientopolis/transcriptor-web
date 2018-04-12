import { Component, OnInit, Input, Output, EventEmitter, ViewChild ,ChangeDetectorRef} from '@angular/core';

import { TranscriptionService } from '../../../services/transcription/transcription.service';

@Component({
  selector: 'app-mark-details',
  templateUrl: './mark-details.component.html',
  styleUrls: ['./mark-details.component.scss']
})
export class MarkDetailsComponent implements OnInit {

  @Input() mark;
  @Input() votable;
  @Input() modalOptions;
  @ViewChild('modal') modal;
  @Output() close = new EventEmitter();
  @Output() successButton = new EventEmitter();
  @Output() addButton = new EventEmitter();

  constructor(private transcriptionService:TranscriptionService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
  }

  open() {
    this.modal.open()
  }

  closeModal() {
    this.close.emit();
    this.changeDetector.detectChanges();
  }

  onSuccessButton() {
    this.successButton.emit();
  }

  onAddButton() {
    this.addButton.emit();
  }

  likeTranscription() {
    this.transcriptionService.like(this.mark.transcription.id)
      .subscribe(transcription => this.mark.transcription = transcription);
  }
}
