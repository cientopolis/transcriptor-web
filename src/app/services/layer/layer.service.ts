import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http/http.service';
import { Observable } from 'rxjs';

import { TranscriptorLayer } from '../../models/transcriptorLayer';

@Injectable()
export class LayerService {

  private createPath = '/api/layer';
  private editPath = '/api/layer/';
  private deletePath = '/api/layer/';
  private getPath = '/api/layer/{layerId}';
  private listByPagePath = '/api/page/';

  constructor(private httpService: HttpService) { }

  create(layer: TranscriptorLayer): Observable<TranscriptorLayer> {
    return this.httpService.post(this.createPath, layer) as Observable<TranscriptorLayer>;
  }

  edit(layer: TranscriptorLayer): Observable<TranscriptorLayer> {
    return this.httpService.put(this.editPath + layer.id, layer) as Observable<TranscriptorLayer>;
  }

  delete(layer: TranscriptorLayer): Observable<TranscriptorLayer> {
    return this.httpService.delete(this.deletePath + layer.id) as Observable<TranscriptorLayer>;
  }

  get(layerId, options = {}): Observable<TranscriptorLayer> {
    return this.httpService.lget([this.getPath, { layerId: layerId }], options) as Observable<TranscriptorLayer>;
  }

  listByPage(pageId): Observable<TranscriptorLayer[]> {
    let path = this.listByPagePath + pageId + "/layers";
    return this.httpService.lget(path) as Observable<TranscriptorLayer[]>;
  }
}
