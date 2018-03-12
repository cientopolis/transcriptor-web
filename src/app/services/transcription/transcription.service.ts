import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http/http.service';

@Injectable()
export class TranscriptionService {
  
  private getPath = '/api/transcription/{transcriptionId}'
  private likePath = '/api/transcription/{transcriptionId}/like';
  private listByMarkPath = '/api/mark/{markId}/transcriptions';
  
  constructor(private httpService: HttpService) { }
  
  like(transcriptionId, options = {}) {
    return this.httpService.get([this.likePath,{transcriptionId:transcriptionId}], options);
  }
  
  listByMark(markId, options = {}) {
    return this.httpService.lget([this.listByMarkPath,{markId:markId}], options);
  }
  
  get(transcriptionId, options = {}) {
    return this.httpService.lget([this.getPath,{transcriptionId:transcriptionId}], options);
  }
}
