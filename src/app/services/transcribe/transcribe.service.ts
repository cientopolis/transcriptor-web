import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http/http.service';

@Injectable()
export class TranscribeService {

  savePath='/api/transcribe/{pageId}/transcribe';

  constructor(private httpService: HttpService) { }

  save(pageId, pageTranscription, options={}) {
    return this.httpService.post([this.savePath, {pageId:pageId}], pageTranscription, options);
  }
}
