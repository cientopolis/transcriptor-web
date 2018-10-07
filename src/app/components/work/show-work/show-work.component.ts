import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {SimpleGlobal} from 'ng2-simple-global';
import { WorkService } from '../../../services/work/work.service';
import { DashboardService } from '../../../services/dashboard/dashboard.service';

import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-show-work',
  templateUrl: './show-work.component.html',
  styleUrls: ['./show-work.component.scss']
})
export class ShowWorkComponent implements OnInit {

  work = null;
  collectionsDeeds :any;
  constructor(private dashboardService: DashboardService,private workService: WorkService, private route: ActivatedRoute,private global: SimpleGlobal,private changeDetector: ChangeDetectorRef, private translate:TranslateService) { }

  ngOnInit() {

    const workId = +this.route.snapshot.paramMap.get('workId');
    this.listRecentActivityWork(workId);
    this.workService.get(workId, { fields: ['owner,collection']})
      .subscribe(work => {
            this.work=work;
            this.global['routeBack'] = "collection/"+this.work.collection.id;

            this.changeDetector.detectChanges();
          }
      );

  }

  onShow() {
    $('.tabs-content.carousel').height($('.carousel-item.active .row').height());
  }
  ngOnDestroy() {
    this.global['routeBack'] = null;
  }

  listRecentActivityWork(work_id) {
    this.dashboardService.listRecentWorkActivity(work_id)
        .subscribe(response => {this.collectionsDeeds = response;this.changeDetector.detectChanges(); });
      }
  getDeedMessage(key){
    var message;
    this.translate.get('deed_type.'+key).subscribe((res: string) => {
      message=res;
    });
    return message;
  }
}
