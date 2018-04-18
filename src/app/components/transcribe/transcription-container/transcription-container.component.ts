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
  score:string;

  constructor(private transcriptionService:TranscriptionService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {this.score=this.transcription.cached_weighted_score + " likes";}

  ngOnChanges(changes: SimpleChanges) {
    this.update();
  }

  likeTranscription(transcription,votable) {
    if(!votable){
      this.transcriptionService.like(transcription.id)
        .subscribe(responseTranscription => {
          transcription = responseTranscription;
          this.score = transcription.cached_weighted_score + " likes";
          this.vote = true;
          this.userVoted = true;
          this.transcription=transcription;
          this.changeDetector.detectChanges();
        });
    }else{

      this.transcriptionService.dislike(transcription.id)
        .subscribe(responseTranscription => {
          transcription = responseTranscription;
          this.vote = false;
          this.score = transcription.cached_weighted_score + " likes";
          this.userVoted = true;
          this.transcription=transcription;
          this.changeDetector.detectChanges();
        });
    }

  }

  getAvatarUrl(username) {
    return 'https://ui-avatars.com/api/?name='+ username + '&background=f61&color=fff';
  }
  
  update() {
    if(this.transcription){
      if(!this.transcription.user){
        this.transcriptionService.get(this.transcription.id, {fields:['user']})
          .subscribe(transcription => {
            this.transcription.user = transcription.user;
            this.score = this.transcription.cached_weighted_score + " likes";
            this.changeDetector.detectChanges();
          });
      }
      if(this.obtainVote){
        this.transcriptionService.isVoted(this.transcription.id, { fields: ['user']})
          .subscribe(votes => {
            this.vote = votes[0].vote;
            this.userVoted = !votes[0].isVote;
            this.changeDetector.detectChanges();
        });
      }
    }
  }
  
}
