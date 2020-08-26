import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private listUsersPath = '/api/admin/user_list';

  constructor(private httpService: HttpService) { }

  listUsers(search = null, page, options = {}) {
    if(!search){
      return this.httpService.lget(this.listUsersPath+"?page="+page, options );
    }else{
      return this.httpService.lget(this.listUsersPath + "?page=" + page + "&search="+search,{});
    }
  }

}
