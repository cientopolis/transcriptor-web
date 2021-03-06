import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { CollectionService } from '../../../services/collection/collection.service';

@Component({
  selector: 'app-create-collection-modal',
  templateUrl: './create-collection-modal.component.html',
  styleUrls: ['./create-collection-modal.component.scss']
})
export class CreateCollectionModalComponent implements OnInit {

  collection:any = {};
  @ViewChild('modalCollection') modalCollection;
  @Output() successCreate = new EventEmitter();
  @Output() close = new EventEmitter();

  modalOptions: Materialize.ModalOptions = {
    complete: () => {
      this.close.emit();
    }
  };

  constructor(private collectionService: CollectionService,) { }

  ngOnInit() {
  }

  createCollection() {
    this.collectionService.create(this.collection)
      .subscribe(collection => {
        this.successCreate.emit(collection);
      });
  }
  
  open(){
    this.modalCollection.openModal();
  }
}
