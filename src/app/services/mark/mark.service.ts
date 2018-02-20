import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http/http.service';
import { Observable } from 'rxjs/Observable';

import { Mark } from '../../models/mark';

@Injectable()
export class MarkService {

  private createPath = '/api/mark';
  //dynamic uri build
  private listByPagePath = '/api/page/';

  constructor(private httpService: HttpService) { }
  
  create(mark: Mark): Observable<Mark> {
    return this.httpService.post(this.createPath, mark) as Observable<Mark>;
  }
  
  listByPage(pageId): Observable<Mark[]> {
    let path = this.listByPagePath + pageId + "/marks";
    return this.httpService.get(path) as Observable<Mark[]>;
  }
}
