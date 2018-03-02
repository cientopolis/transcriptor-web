import { Component, OnInit } from '@angular/core';
import {SimpleGlobal} from 'ng2-simple-global';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Observable } from 'rxjs/Observable';
import { Collection } from '../../models/Collection';
import { DashboardResponse } from '../../models/dashboardResponse';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  collectionsDeeds: DashboardResponse;
  collectionsOwner:DashboardResponse;
  constructor(private dashboardService: DashboardService,private global: SimpleGlobal) { }

  ngOnInit() {

    let storedUser=localStorage.getItem('currentUser');
    if(storedUser==null){
      this.recentActivity();
    }else{
      console.log(storedUser);
      this.listRecentActivityOwner()
      this.listCollectionOwner();
    }
  }


    recentActivity() {
      console.log("aaaaaaaaaaaaa");
      this.dashboardService.listRecentActivity()
          .subscribe(response => this.handleResponse(response));
    }

    listRecentActivityOwner() {
      console.log("owner");
      this.dashboardService.listRecentActivityOwner()
          .subscribe(response => this.handleResponse(response));
    }

    listCollectionOwner() {
      console.log("col");
      this.dashboardService.listCollectionOwner()
          .subscribe(response => this.handleResponseCollectionOwner(response));

    }
    private handleResponseCollectionOwner(collection) {
     //console.log(collection);
      this.collectionsOwner=collection;
      console.log(this.collectionsOwner);

    }

    private handleResponse(collection) {
     //console.log(collection);
      this.collectionsDeeds=collection;
      console.log(this.collectionsDeeds);

    }

}
