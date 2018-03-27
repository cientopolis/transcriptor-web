import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http/http.service';


@Injectable()
export class UserService {
  private editPath = '/api/registration';
  constructor(private httpService: HttpService) { }

  edit(user, options = {}) {
    console.log(user);
    return this.httpService.put([this.editPath,{user_id:user.id}], {user:user}, options);
  }

}
