import { Component, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { CollectionService } from '../../services/collection/collection.service';
import { Observable } from 'rxjs';
import {SimpleGlobal} from 'ng2-simple-global';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {
  collections=[];
  @ViewChild('modalCollection') modalCollection;
  collection:any = {};


  constructor(private collectionService: CollectionService,private changeDetector: ChangeDetectorRef, public global: SimpleGlobal) {
    this.global['routeBack'] = "home";
  }

  ngOnInit() {
    this.listCollections();
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
    this.modalCollection.openModal();
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
