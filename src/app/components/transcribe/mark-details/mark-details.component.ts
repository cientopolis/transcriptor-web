import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild ,ChangeDetectorRef} from '@angular/core';

import { TranscriptionService } from '../../../services/transcription/transcription.service';
import { MarkService } from '../../../services/mark/mark.service';

@Component({
  selector: 'app-mark-details',
  templateUrl: './mark-details.component.html',
  styleUrls: ['./mark-details.component.scss']
})
export class MarkDetailsComponent implements OnInit {

  @Input() mark;
  @Input() obtainMark = false;
  @Input() votable;
  @Input() modalOptions;
  @ViewChild('modal') modal;
  @Output() close = new EventEmitter();
  @Output() successButton = new EventEmitter();
  @Output() addButton = new EventEmitter();
  @ViewChild('transcriptionContainer') transcriptionContainer;

  constructor(private transcriptionService:TranscriptionService, private markService: MarkService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {}
  
  ngOnChanges(changes: SimpleChanges) {
    if(this.mark && this.obtainMark){
      this.markService.get(this.mark.id, {fields:['transcription']})
        .subscribe(mark => this.mark.transcription = mark.transcription);
    }
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
  
  refresh(){
    this.transcriptionContainer.update();
  }
}
