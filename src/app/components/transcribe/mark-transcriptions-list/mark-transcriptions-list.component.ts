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
  votes = [];

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
        for (let transcription of this.transcriptions) {
            transcription.likeUser = false;
        }
        this.changeDetector.detectChanges();
      });

      this.transcriptionService.listVotesUserByMark(this.mark.id, { fields: ['user']})
        .subscribe(votes => {
          this.votes = votes;
          this.changeDetector.detectChanges();
          this.loadLikes();
      });

  }

  loadLikes(){
    for (let transcription of this.transcriptions) {
        for (let vote of this.votes){
          if(vote.id==transcription.id){
            transcription.likeUser = vote.vote;
            break;
          }
        }
    }
    this.changeDetector.detectChanges();
  }
}
