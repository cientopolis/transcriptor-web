import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

import { CollectionService } from '../../../services/collection/collection.service';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.scss']
})
export class EditCollectionComponent implements OnInit {

  @Input() collection;
  @Input() showButtons = true;
  lockDelete = true;
  collectionCopy: any;

  constructor(private collectionService: CollectionService) { }

  ngOnInit() {}
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes.collection) {
      this.collectionCopy = Object.assign({}, this.collection)
    }
  }

  save() {
    this.collectionService.edit(this.collectionCopy)
      .subscribe(collection => this.collection = Object.assign(this.collection,collection));
  }
  
  confirmDelete() {
    this.lockDelete = false
  }

  delete() {
    this.collectionService.delete(this.collectionCopy.id)
      .subscribe(collection => this.collection = Object.assign(this.collection,collection))
  }

}
