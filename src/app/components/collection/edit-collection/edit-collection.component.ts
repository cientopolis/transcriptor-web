import { Component, OnInit, Input } from '@angular/core';

import { CollectionService } from '../../../services/collection/collection.service';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.scss']
})
export class EditCollectionComponent implements OnInit {

  @Input() collection;

  constructor(private collectionService: CollectionService) { }

  ngOnInit() {
  }
  
  save() {
    this.collectionService.edit(this.collection)
      .subscribe(collection => this.collection = Object.assign(this.collection,collection));
  }
  
  delete() {
    this.collectionService.delete(this.collection.id)
      .subscribe(collection => Object.assign(this.collection,collection))
  }

}
