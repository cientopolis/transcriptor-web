import { Component, OnInit, ViewChild } from '@angular/core';
import {SimpleGlobal} from 'ng2-simple-global';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Observable } from 'rxjs/Observable';
import { Collection } from '../../models/Collection';
import { DashboardResponse } from '../../models/dashboardResponse';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  collectionsDeeds: DashboardResponse;
  collectionsOwner:DashboardResponse;
  @ViewChild('collectionCreationModal') collectionCreationModal: any;
  @ViewChild('uploadComponent') uploadComponent: any;  
  
  
  constructor(private dashboardService: DashboardService,private global: SimpleGlobal, private translate:TranslateService) { }

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
      this.dashboardService.listRecentActivity()
          .subscribe(response => this.handleResponse(response));
    }

    listRecentActivityOwner() {
      this.dashboardService.listRecentActivityOwner()
          .subscribe(response => this.handleResponse(response));
    }

    listCollectionOwner() {
      this.dashboardService.listCollectionOwner()
          .subscribe(response => this.handleResponseCollectionOwner(response));

    }
    
    onShow() {
      $('.tabs-content.carousel').height($('.carousel-item.active .row').height());
    }
    
    private handleResponseCollectionOwner(collection) {
      this.collectionsOwner=collection;
    }

    private handleResponse(collection) {
      this.collectionsDeeds=collection;
    }
    
    getDeedMessage(key){
      var message;
      this.translate.get('deed_type.'+key).subscribe((res: string) => {
        message=res;
      });
      return message;
    }
    
    openNewCollectionModal(){
      this.collectionCreationModal.open();
    }
    
    onCreateCollection(){
      this.uploadComponent.update();
    }
}
