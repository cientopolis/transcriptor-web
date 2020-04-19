import { Component, OnInit, Input, Output, ViewChild, ChangeDetectorRef, EventEmitter } from '@angular/core';

import { TranscriptionService } from '../../../services/transcription/transcription.service';

@Component({
  selector: 'app-transcription-form',
  templateUrl: './transcription-form.component.html',
  styleUrls: ['./transcription-form.component.scss']
})
export class TranscriptionFormComponent implements OnInit {

  @Input() mark;
  @Input() modalOptions: Materialize.ModalOptions = {};
  @ViewChild('modal') modal;
  transcription:any;
  @Output() success = new EventEmitter();
  @Output() close = new EventEmitter();

  constructor(private transcriptionService:TranscriptionService) { }

  ngOnInit() {
    this.reset();
    
  }
  
  reset() {
    this.transcription = {text:'', mark_id: null};
  }
  
  open() {
    this.modal.openModal();
  }
  
  add() {
    if(this.mark){
      this.transcription.mark_id = this.mark.id
      this.transcriptionService.create(this.transcription)
      .subscribe(transcription => {
        this.success.emit({
          type:'create',
          data:transcription
        });
        this.reset();
      });
    }
  }
  
  closeModal() {
    this.close.emit();
  }

  edit() {}
  
  delete() {}
}
