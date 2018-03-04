import { Component, OnInit, Input } from '@angular/core';

import { WorkService } from '../../../services/work/work.service';

@Component({
  selector: 'app-edit-work',
  templateUrl: './edit-work.component.html',
  styleUrls: ['./edit-work.component.scss']
})
export class EditWorkComponent implements OnInit {

  @Input() work;

  constructor(private workService: WorkService) { }

  ngOnInit() {
  }
  
  save() {
    this.workService.edit(this.work)
      .subscribe(work => this.work = Object.assign(this.work,work));
  }
  
  delete() {
    this.workService.delete(this.work.id)
      .subscribe(work => Object.assign(this.work,work))
  }

}
