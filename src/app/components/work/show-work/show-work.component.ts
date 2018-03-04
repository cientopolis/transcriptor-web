import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WorkService } from '../../../services/work/work.service';

@Component({
  selector: 'app-show-work',
  templateUrl: './show-work.component.html',
  styleUrls: ['./show-work.component.scss']
})
export class ShowWorkComponent implements OnInit {
  
  work = null;

  constructor(private workService: WorkService, private route: ActivatedRoute) { }

  ngOnInit() {
    const workId = +this.route.snapshot.paramMap.get('workId');
    this.workService.get(workId, { fields: ['owner,collection']})
      .subscribe(work => this.work=work);
  }

}
