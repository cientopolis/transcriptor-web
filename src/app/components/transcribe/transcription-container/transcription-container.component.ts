import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

import { TranscriptionService } from '../../../services/transcription/transcription.service';

@Component({
  selector: 'app-transcription-container',
  templateUrl: './transcription-container.component.html',
  styleUrls: ['./transcription-container.component.scss']
})
export class TranscriptionContainerComponent implements OnInit {

  @Input() transcription;

  constructor(private transcriptionService:TranscriptionService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    if(!this.transcription.user){
      this.transcriptionService.get(this.transcription.id, {fields:['user']})
        .subscribe(transcription => {
          this.transcription.user = transcription.user;
          this.changeDetector.detectChanges();
        });
    }
  }

  likeTranscription(transcription) {
    this.transcriptionService.like(transcription.id)
      .subscribe(responseTranscription => transcription = responseTranscription);
  }
  
  getAvatarUrl(username) {
    return 'https://ui-avatars.com/api/?name='+ username + '&background=f61&color=fff';
  }
}
