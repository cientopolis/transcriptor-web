import { Component, OnInit,ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {SimpleGlobal} from 'ng2-simple-global';
import { WorkService } from '../../../services/work/work.service';
import { DashboardService } from '../../../services/dashboard/dashboard.service';

import {TranslateService} from '@ngx-translate/core';
import { FlashMessagesService } from 'app/services/util/flash-messages/flash-messages.service';


@Component({
  selector: 'app-show-work',
  templateUrl: './show-work.component.html',
  styleUrls: ['./show-work.component.scss']
})
export class ShowWorkComponent implements OnInit {

  work = null;
  collectionsDeeds :any;
  @ViewChild('fileInput') fileInput;
  workImageUrl: string = 'assets/img/icons/default_collections.jpg'

  constructor(
    private dashboardService: DashboardService,
    private workService: WorkService,
    private route: ActivatedRoute,
    public global: SimpleGlobal,
    private changeDetector: ChangeDetectorRef,
    private translate:TranslateService,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    const workId = +this.route.snapshot.paramMap.get('workId');
    this.listRecentActivityWork(workId);
    this.workService.get(workId, { fields: ['owner,collection']})
      .subscribe(work => {
            this.work=work;
            this.global['routeBack'] = "collection/"+this.work.collection.id;
            this.workImageUrl = this.work.getThumbnailUrl()

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

  upload() {
    const files: FileList = this.fileInput.nativeElement.files;
    if (files.length === 0 || isNaN(this.work.id) || this.work.id === null) {
      this.flashMessagesService.addI18n('upload.validationMessages.noFileSelected');
      return;
    };

    const formData = new FormData();
    formData.append('utf', '✓');
    formData.append('work[picture]', files[0]);
    formData.append('work_id', this.work.id + '');

    this.workService.uploadWork(this.work.id, formData).subscribe(work => {
      this.workImageUrl = work.getThumbnailUrl()
    });
  }

  openImageLoader() {
    $('#work_picture').trigger('click');
  }
}
