import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {SimpleGlobal} from 'ng2-simple-global';
import { WorkService } from '../../../services/work/work.service';

@Component({
  selector: 'app-show-work',
  templateUrl: './show-work.component.html',
  styleUrls: ['./show-work.component.scss']
})
export class ShowWorkComponent implements OnInit {

  work = null;

  constructor(private workService: WorkService, private route: ActivatedRoute,private global: SimpleGlobal,private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {

    const workId = +this.route.snapshot.paramMap.get('workId');
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
}
