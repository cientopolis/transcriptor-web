import { Component, OnInit, Input } from '@angular/core';

import { WorkService } from '../../../services/work/work.service';

@Component({
  selector: 'app-list-work-pages',
  templateUrl: './list-work-pages.component.html',
  styleUrls: ['./list-work-pages.component.scss']
})
export class ListWorkPagesComponent implements OnInit {
  
  @Input() work;
  pages = [];

  constructor(private workService: WorkService) { }

  ngOnInit() {
    this.loadPages();
  }
  
  loadPages() {
    this.workService.listPages(this.work.id)
      .subscribe(pages => this.pages = pages);
  }
}
