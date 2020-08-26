import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { Observable } from 'rxjs';
import { PlayerInfo } from 'app/models/playerInfo';


@Injectable()
export class UserService {
  private editPath = '/api/registration';
  private createPath = '/api/registration';
  private getMetagameInfoPath = '/api/user/metagame/info';
  private deletePath = '/api/registration/{userid}';
  constructor(private httpService: HttpService) { }

  edit(user, options = {}) {
    return this.httpService.put([this.editPath,{user_id:user.id}], {user:user}, options);
  }

  create(user, options = {}) {
    return this.httpService.post([this.createPath,{user_id:user.id}], {user:user}, options);
  }

  userInfoMetagame(options = {}): Observable<PlayerInfo> {
    return this.httpService.lpost(this.getMetagameInfoPath, null, { mapper: PlayerInfo.mapToClass }) as Observable<PlayerInfo>;
  }

  delete(user, options = {}) {
    return this.httpService.delete([this.deletePath, { userid: user.id }], options);
  }

}
