import { Component, OnInit, Input } from '@angular/core';

import { CollectionService } from '../../../services/collection/collection.service';

@Component({
  selector: 'app-list-collection-works',
  templateUrl: './list-collection-works.component.html',
  styleUrls: ['./list-collection-works.component.scss']
})
export class ListCollectionWorksComponent implements OnInit {
  
  @Input() collection;
  works = [];

  constructor(private collectionService: CollectionService) { }

  ngOnInit() {
    this.loadWorks();
  }
  
  loadWorks() {
    this.collectionService.listWorks(this.collection.id)
      .subscribe(works => this.works = works);
  }
}
