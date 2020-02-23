import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';

import { LayerService } from '../../../../services/layer/layer.service';

@Component({
  selector: 'app-layer-modal',
  templateUrl: './layer-modal.component.html',
  styleUrls: ['./layer-modal.component.scss']
})
export class LayerModalComponent implements OnInit {

  @Input() page;
  @Input() modalOptions: Materialize.ModalOptions = {};
  @ViewChild('modal') modal;
  // transcriptions = [];
  // votes = [];
  @Output() close = new EventEmitter();

  constructor(private layerService: LayerService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
  }

  open() {
    this.modal.open();
    // this.loadTranscriptions();
  }

  closeModal() {
    this.close.emit();
  }

  // loadTranscriptions() {
  //   this.transcriptionService.listByMark(this.mark.id, { fields: ['user'] })
  //     .subscribe(transcriptions => {
  //       this.transcriptions = transcriptions;
  //       for (let transcription of this.transcriptions) {
  //         transcription.voted = true;
  //       }
  //       this.loadVotes();
  //       this.changeDetector.detectChanges();
  //     });
  // }

  // loadVotes() {
  //   this.transcriptionService.listVotesUserByMark(this.mark.id, { fields: ['user'] })
  //     .subscribe(votes => {
  //       this.votes = votes;
  //       this.setLikes();
  //     });
  // }

  // setLikes() {
  //   for (let transcription of this.transcriptions) {
  //     for (let vote of this.votes) {
  //       if (vote.id == transcription.id) {
  //         transcription.vote = !vote.vote;
  //         break;
  //       }
  //     }
  //   }
  //   this.changeDetector.detectChanges();
  // }
}