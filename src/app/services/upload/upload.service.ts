import { Injectable } from '@angular/core';

import { HttpService } from '../http/http.service';

@Injectable()
export class UploadService {

  private uploadPath = '/api/upload';

  constructor(private httpService: HttpService) { }

  upload(formData) {
    return this.httpService.post(this.uploadPath, formData, { headers: {} });
  }
}
