import { Component, OnInit,ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {SimpleGlobal} from 'ng2-simple-global';
import { CollectionService } from '../../../services/collection/collection.service';
import { FlashMessagesService } from 'app/services/util/flash-messages/flash-messages.service';
import { Collection } from 'app/models/Collection';

@Component({
  selector: 'app-show-collection',
  templateUrl: './show-collection.component.html',
  styleUrls: ['./show-collection.component.scss']
})
export class ShowCollectionComponent implements OnInit {

  collection: Collection = null;
  @ViewChild('fileInput') fileInput;
  collectionImageUrl: string = 'assets/img/icons/default_collections.jpg'


  constructor(
    private collectionService: CollectionService,
    private route: ActivatedRoute,
    public global: SimpleGlobal,
    private changeDetector: ChangeDetectorRef,
    private flashMessagesService: FlashMessagesService) {
    this.global['routeBack'] = "collections/list";
    localStorage.setItem('isOwner', "false");
  }

  ngOnInit() {
    const collectionId = +this.route.snapshot.paramMap.get('collectionId');
    this.collectionService.get(collectionId, { fields: ['owner','isOwner']}).subscribe(collection => {
        this.collection = collection
        localStorage.setItem('isOwner', `${collection.isOwner}`);
        this.collectionImageUrl = this.collection.getThumbnailUrl()
    });
    this.changeDetector.detectChanges();
  }

  onShow() {
    $('.tabs-content.carousel').height($('.carousel-item.active .row').height());
  }
  ngOnDestroy() {
    this.global['routeBack'] = null;
  }

  upload() {
    const files: FileList = this.fileInput.nativeElement.files;
    if (files.length === 0 || isNaN(this.collection.id) || this.collection.id === null) {
      this.flashMessagesService.addI18n('upload.validationMessages.noFileSelected');
      return;
    };

    const formData = new FormData();
    formData.append('utf', '✓');
    formData.append('collection[picture]', files[0]);
    formData.append('collection_id', this.collection.id + '');

    this.collectionService.uploadCollection(this.collection.id ,formData).subscribe(collection => {
      this.collectionImageUrl = collection.getThumbnailUrl()
    });
  }

  openImageLoader() {
    $('#collection_picture').trigger('click');
  }
}
