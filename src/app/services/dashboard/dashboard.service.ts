import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http/http.service';

import { Observable } from 'rxjs/Observable';

import { Collection } from '../../models/Collection';

import { DashboardResponse } from '../../models/dashboardResponse';


@Injectable()
export class DashboardService {

  private dashboardPath = '/api/dashboard';

  constructor(private httpService: HttpService) { }

  listRecentActivity(): Observable<DashboardResponse[]> {
    let path = this.dashboardPath + "/guest";
    return this.httpService.get(path) as Observable<DashboardResponse[]>;
  }

  listRecentActivityOwner(): Observable<DashboardResponse[]> {
    let path = this.dashboardPath + "/owner";
    return this.httpService.get(path) as Observable<DashboardResponse[]>;
  }
  listCollectionOwner(): Observable<DashboardResponse[]> {
    let path = this.dashboardPath + "/owner/collections";
    return this.httpService.get(path) as Observable<DashboardResponse[]>;
  }
}
