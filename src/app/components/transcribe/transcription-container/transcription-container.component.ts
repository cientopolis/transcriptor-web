import { Component, OnInit, OnChanges, Input, ChangeDetectorRef, SimpleChanges } from '@angular/core';

import { TranscriptionService } from '../../../services/transcription/transcription.service';

@Component({
  selector: 'app-transcription-container',
  templateUrl: './transcription-container.component.html',
  styleUrls: ['./transcription-container.component.scss']
})
export class TranscriptionContainerComponent implements OnInit {

  @Input() transcription;
  @Input() vote;
  @Input() userVoted;
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
            console.log("--------");
            console.log(votes);
            console.log("--------");
            this.vote = votes[0].vote;
            this.userVoted = !votes[0].isVote;
            this.changeDetector.detectChanges();
        });
      }
    }
  }

  likeTranscription(transcription,votable) {
    if(!votable){
      console.log("no tiene like");
      this.transcriptionService.like(transcription.id)
        .subscribe(responseTranscription => {
          transcription = responseTranscription;
          console.log(transcription);
          this.vote = true;
          this.userVoted = true;
          this.changeDetector.detectChanges();
        });
    }else{
      console.log("ya tiene like");
      this.transcriptionService.dislike(transcription.id)
        .subscribe(responseTranscription => {
          transcription = responseTranscription;
          console.log(transcription);
          this.vote = false;
          this.userVoted = true;
          this.changeDetector.detectChanges();
        });
    }

  }

  getAvatarUrl(username) {
    return 'https://ui-avatars.com/api/?name='+ username + '&background=f61&color=fff';
  }
}
