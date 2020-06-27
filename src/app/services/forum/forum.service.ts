import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http/http.service';

@Injectable()
export class ForumService {


  private listPath = '/api/foro/list';
  private getPath = '/api/foro/{foroId}';
  private getPathClass = '/api/foro/get';
  private editPath = '/api/foro/{foroId}';
  private deletePath = '/api/foro/{foroId}';
  private createPath = '/api/foro';

  constructor(private httpService: HttpService) { }


  get(foroId, options = {}) {
    return this.httpService.lget([this.getPath,{foroId:foroId}], options);
  }

  getElement(element_id,element_type, options = {}) {
    let getPathByClassName=this.getPathClass + "?element_id="+element_id+"&className="+element_type;
    return this.httpService.lget([getPathByClassName], options);
  }


  edit(foro, options = {}) {
    return this.httpService.put([this.editPath,{foroId:foro.id}], foro, options);
  }

  delete(foroId, options = {}) {
    return this.httpService.delete([this.deletePath,{foroId:foroId}], options);
  }

  create(foro, options = {}) {
    return this.httpService.lpost(this.createPath,foro,options);
  }

}
