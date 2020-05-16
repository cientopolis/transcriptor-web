import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

import { WorkService } from '../../../services/work/work.service';

@Component({
  selector: 'app-edit-work',
  templateUrl: './edit-work.component.html',
  styleUrls: ['./edit-work.component.scss']
})
export class EditWorkComponent implements OnInit {

  @Input() work;
  @Input() showButtons = true;
  lockDelete = true;
  workCopy: any;

  constructor(private workService: WorkService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.work) {
      this.workCopy = Object.assign({}, this.work)
    }
  }
  
  save() {
    this.workService.edit(this.workCopy)
      .subscribe(work => this.work = Object.assign(this.work, work));
  }
  
  confirmDelete() {
    this.lockDelete = false
  }

  delete() {
    this.workService.delete(this.work.id)
      .subscribe(work => this.work = Object.assign(this.work, work))
  }

}
