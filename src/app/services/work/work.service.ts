import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http/http.service';
import { Work } from 'app/models/work';
import { Observable } from 'rxjs';
import { Page } from 'app/models/page';


@Injectable()
export class WorkService {

  private getPath = '/api/work/{workId}';
  private listPagesPath = '/api/work/{workId}/pages';
  private editPath = '/api/work/{workId}';
  private deletePath = '/api/work/{workId}';
  private uploadWorkPath = '/api/work/update/{workId}'

  constructor(private httpService: HttpService) { }

  get(workId, options = {}): Observable<Work> {
    options['responseDataType'] = Work
    return this.httpService.lget([this.getPath, { workId: workId }], options) as Observable<Work>;
  }
  
  listPages(workId, options = {}): Observable<Page[]> {
    options['responseDataType'] = Page
    return this.httpService.lget([this.listPagesPath, { workId: workId }], options) as Observable<Page[]>;
  }
  
  edit(work, options = {}): Observable<Work> {
    return this.httpService.put([this.editPath, { workId: work.id }], work, options) as Observable<Work>;
  }
  
  delete(workId, options = {}): Observable<Work> {
    return this.httpService.delete([this.deletePath, { workId: workId }], options) as Observable<Work>;
  }

  uploadWork(workId, formData): Observable<Work> {
    return this.httpService
      .post([this.uploadWorkPath, { workId: workId }],
        formData,
        { headers: {}, responseDataType: Work }) as Observable<Work>;
  }
}
