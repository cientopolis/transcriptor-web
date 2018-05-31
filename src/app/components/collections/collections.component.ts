import { Component, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { CollectionService } from '../../services/collection/collection.service';
import { Observable } from 'rxjs/Observable';
import {SimpleGlobal} from 'ng2-simple-global';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {
  collections=[];
  @ViewChild('modalCollection') modalCollection;
  collection = {};


  constructor(private collectionService: CollectionService,private changeDetector: ChangeDetectorRef, private global: SimpleGlobal) { }

  ngOnInit() {
        this.listCollections();
        this.global['routeBack'] = "home";
        this.changeDetector.detectChanges();
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

  ngOnDestroy() {
    this.global['routeBack'] = null;
  }
}
