import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http/http.service';

import { Mark } from '../../models/mark';

@Injectable()
export class MarkService {

  private createPath = '/api/mark';

  constructor(private httpService: HttpService) { }
  
  create(mark: Mark) {
    return this.httpService.post(this.createPath, mark);
  }
}
