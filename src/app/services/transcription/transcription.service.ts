import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http/http.service';

@Injectable()
export class TranscriptionService {

  private getPath = '/api/transcription/{transcriptionId}';
  private createPath = '/api/transcription';
  private likePath = '/api/transcription/{transcriptionId}/like';
  private dislikePath = '/api/transcription/{transcriptionId}/dislike';
  private listByMarkPath = '/api/mark/{markId}/transcriptions';
  private listVotesUserByMarkPath = '/api/mark/{markId}/votes';
  private voteATranscriptionPath = '/api/transcription/{transcriptionId}/vote';

  constructor(private httpService: HttpService) { }

  like(transcriptionId, options = {}) {
    return this.httpService.get([this.likePath,{transcriptionId:transcriptionId}], options);
  }

  dislike(transcriptionId, options = {}) {
    return this.httpService.get([this.dislikePath,{transcriptionId:transcriptionId}], options);
  }

  listByMark(markId, options = {}) {
    return this.httpService.lget([this.listByMarkPath,{markId:markId}], options);
  }

  get(transcriptionId, options = {}) {
    return this.httpService.lget([this.getPath,{transcriptionId:transcriptionId}], options);
  }

  listVotesUserByMark(markId, options = {}) {
    return this.httpService.lget([this.listVotesUserByMarkPath,{markId:markId}], options);
  }

  isVoted(transcriptionId, options = {}) {
    return this.httpService.lget([this.voteATranscriptionPath,{transcriptionId:transcriptionId}], options);
  }

  create(transcription, options = {}) {
    return this.httpService.post(this.createPath, transcription, options);
  }
}
