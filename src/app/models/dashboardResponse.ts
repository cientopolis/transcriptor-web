import { DashboardData } from './dashboard_data';
export class DashboardResponse {
  data: Array<DashboardData> ;

  constructor(data){
    this.data = data;
  }
}
