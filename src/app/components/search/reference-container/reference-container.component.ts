import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MarkService } from 'app/services/mark/mark.service';
import { Mark } from 'app/models/mark';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-reference-container',
  templateUrl: './reference-container.component.html',
  styleUrls: ['./reference-container.component.scss']
})
export class ReferenceContainerComponent implements OnInit {

  @ViewChild('referenceCollapsible') referenceCollapsible;

  @Input() referencesGroup: any
  @Input() filterSlugs: string[]
  @Output() onReferenceSelection = new EventEmitter<Mark>()
  isCollapsed = false
  marks: Mark[] = []

  constructor(private markService: MarkService) { }

  ngOnInit() {
  }

  onToggleCollapse(event) {
    event.stopPropagation()
    this.isCollapsed = !this.isCollapsed
    this.isCollapsed ? this.referenceCollapsible.open(0) : this.referenceCollapsible.close(0);
    if (this.isCollapsed) {
      this.fetchMarks()
    }
  }

  fetchMarks() {
    if (this.filterSlugs && this.filterSlugs.length > 0) {
      this.markService.listBySlug(this.filterSlugs, this.referencesGroup.pageId).subscribe(marks => {
        this.marks = marks
      })
    }
    console.log(this.marks);
  }

  getThumbnailUrl(reference) {
    return environment.apiUrl + reference.thumbnail
  }

}
