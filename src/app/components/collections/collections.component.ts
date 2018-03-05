import { Component, OnInit, ViewChild } from '@angular/core';
import { CollectionService } from '../../services/collection/collection.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {
  collections=[];
  @ViewChild('modalCollection') modalCollection;
  collection = {};
  
  constructor(private collectionService: CollectionService) { }

  ngOnInit() {
        this.listCollections();
  }

  listCollections() {
    console.log("owner");
    this.collectionService.listCollections()
        .subscribe(response => this.handleResponse(response));
  }

  private handleResponse(collection) {
    this.collections=collection;
    console.log(this.collections);
  }
  
  openModalCollection() {
    this.modalCollection.open();
  }
  
  createCollection() {
    this.collectionService.create(this.collection)
      .subscribe(collection => {
        this.collection={};
        this.listCollections()
      });
  }
}
