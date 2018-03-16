import { Component, OnInit, OnChanges, Input, ChangeDetectorRef, SimpleChanges } from '@angular/core';

import { TranscriptionService } from '../../../services/transcription/transcription.service';

@Component({
  selector: 'app-transcription-container',
  templateUrl: './transcription-container.component.html',
  styleUrls: ['./transcription-container.component.scss']
})
export class TranscriptionContainerComponent implements OnInit {

  @Input() transcription;
  @Input() votable;
  @Input() obtainVote;

  constructor(private transcriptionService:TranscriptionService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if(this.transcription){
      if(!this.transcription.user){
        this.transcriptionService.get(this.transcription.id, {fields:['user']})
          .subscribe(transcription => {
            this.transcription.user = transcription.user;
            this.changeDetector.detectChanges();
          });
      }
      if(this.obtainVote){
        this.transcriptionService.isVoted(this.transcription.id, { fields: ['user']})
          .subscribe(votes => {
            this.votable = !votes[0].vote;
            this.changeDetector.detectChanges();
        });
      }
    }
  }

  likeTranscription(transcription) {
    this.transcriptionService.like(transcription.id)
      .subscribe(responseTranscription => {
        transcription = responseTranscription;
        this.votable = false;
        this.changeDetector.detectChanges();
      });
  }

  getAvatarUrl(username) {
    return 'https://ui-avatars.com/api/?name='+ username + '&background=f61&color=fff';
  }
}
