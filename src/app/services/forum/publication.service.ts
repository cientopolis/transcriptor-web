import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http/http.service';


@Injectable()
export class PublicationService {


  private listPath = '/api/publication/list/';
  private getPath = '/api/publication/{publicationId}';
  private editPath = '/api/publication/{publicationId}';
  private deletePath = '/api/publication';
  private createPath = '/api/publication';
  private listPathChild = '/api/publication/lists';
  private likePath = '/api/publication/like';
  private dislikePath = '/api/publication/dislike';

  constructor(private httpService: HttpService) { }

  list(foroId,options = {}) {
    let path = this.listPath+foroId;
    return this.httpService.lget(path,options);
  }

  listChild(publicationId,options = {}) {
    let pathc = this.listPathChild+"?publication_id="+publicationId;
    return this.httpService.lget(pathc,options);
  }

  get(publicationId, options = {}) {
    return this.httpService.lget([this.getPath,{publicationId:publicationId}], options);
  }

  edit(publication, options = {}) {
    return this.httpService.put([this.editPath,{publicationId:publication.id}], publication, options);
  }

  delete(publicationId, options = {}) {
    return this.httpService.delete(this.deletePath+"?id="+publicationId, options);
  }

  create(publication, options = {}) {
    return this.httpService.post(this.createPath,publication,options);
  }
  like(publicationId, options = {}) {
    return this.httpService.get(this.likePath+"?publication_id="+publicationId, options);
  }
  dislike(publicationId, options = {}) {
    return this.httpService.get(this.dislikePath+"?publication_id="+publicationId, options);
  }
}
