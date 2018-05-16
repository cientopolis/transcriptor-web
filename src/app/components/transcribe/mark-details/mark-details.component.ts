import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges, ViewChild ,ChangeDetectorRef} from '@angular/core';

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
  @Output() changedTranscription = new EventEmitter();
  @ViewChild('transcriptionContainer') transcriptionContainer;

  constructor(private transcriptionService:TranscriptionService, private markService: MarkService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {}
  
  ngOnChanges(changes: SimpleChanges) {
    this.tryFetchMark();
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
    this.tryFetchMark();
    this.transcriptionContainer.update();
  }
  
  tryFetchMark(){
    if(this.mark && this.mark.id && this.obtainMark){
      this.markService.get(this.mark.id, {fields:['transcription']})
        .subscribe(mark => {
          if(this.mark.transcription.id != mark.transcription.id){
            this.changedTranscription.emit();
          }
          this.mark.transcription = mark.transcription;
        });
    }
  }
}
