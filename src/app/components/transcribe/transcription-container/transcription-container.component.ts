import { Component, OnInit, OnChanges, Input, ChangeDetectorRef, SimpleChanges,ViewChild } from '@angular/core';

import { TranscriptionService } from '../../../services/transcription/transcription.service';
import { ForumService } from '../../../services/forum/forum.service';


@Component({
  selector: 'app-transcription-container',
  templateUrl: './transcription-container.component.html',
  styleUrls: ['./transcription-container.component.scss']
})
export class TranscriptionContainerComponent implements OnInit {

  @Input() transcription;
  @Input() vote = null;
  @Input() userVoted;
  @Input() obtainVote;
  forum = {};
  score:string;

  @ViewChild('publicationsList') publicationsList: any;


  constructor(private transcriptionService:TranscriptionService,private forumService:ForumService ,private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    if(this.transcription){
      this.score=this.transcription.cached_weighted_score + " likes";
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.update();
  }

  likeTranscription(votable) {
    if(!votable){
      this.transcriptionService.like(this.transcription.id)
        .subscribe(responseTranscription => {
          this.changeLikeStatus(responseTranscription, true);
        });
    }else{
      this.transcriptionService.dislike(this.transcription.id)
        .subscribe(responseTranscription => {
          this.changeLikeStatus(responseTranscription, false);
        });
    }
  }
  
  private changeLikeStatus(newTranscriptionStatus,liked){
    newTranscriptionStatus.user = this.transcription.user;
    this.transcription = newTranscriptionStatus;
    this.score = this.transcription.cached_weighted_score + " likes";
    this.vote = liked;
    this.userVoted = true;
    this.changeDetector.detectChanges();
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
            this.vote = Boolean(votes[0].vote);
            this.userVoted = !Boolean(votes[0].isVote);
            this.changeDetector.detectChanges();
        });
      }
    }
  }

  viewPublications(){
    this.getForum(this.transcription.id);
  }

  getForum(id) {
    this.forumService.getElement(id,"Contribution",{ fields: ['user','element']})
        .subscribe(response => this.setForum(response));
  }

  private setForum(forum) {
    if(forum==null){
      this.createForum();
    }else{
      this.forum=forum;
      this.changeDetector.detectChanges();
      this.openPublicationsList();
    }

  }

  openPublicationsList() {
    this.publicationsList.open();
  }

  createForum() {
    this.forum={element:{id: this.transcription.id,className:"Contribution"}};
    this.forumService.create(this.forum)
      .subscribe(response =>this.setForum(response));
    }



}
