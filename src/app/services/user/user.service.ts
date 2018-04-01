import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http/http.service';


@Injectable()
export class UserService {
  private editPath = '/api/registration';
  private createPath = '/api/registration';
  constructor(private httpService: HttpService) { }

  edit(user, options = {}) {
    return this.httpService.put([this.editPath,{user_id:user.id}], {user:user}, options);
  }

  create(user, options = {}) {
    console.log("create");
    console.log(user);
    return this.httpService.post([this.createPath,{user_id:user.id}], {user:user}, options);
  }

}
