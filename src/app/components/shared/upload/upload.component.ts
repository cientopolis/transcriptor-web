import { Component, OnInit, ViewChild } from '@angular/core';

import { UploadService } from '../../../services/upload/upload.service';
import { CollectionService } from '../../../services/collection/collection.service';  
import { FlashMessagesService } from '../../../services/util/flash-messages/flash-messages.service';  

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  @ViewChild('fileInput') fileInput;
  collections = [];
  collectionId = null;
  
  constructor(private uploadService: UploadService, private collectionService: CollectionService, private flashMessagesService: FlashMessagesService) {}
  
  ngOnInit() {
    this.collectionService.listOwn().subscribe(collections => this.collections = collections);
  }
  
  upload() {
    const files: FileList = this.fileInput.nativeElement.files;
    if (files.length === 0 || isNaN(this.collectionId)) { 
      this.flashMessagesService.add('You must select a collection and select a file to upload!');
      return; 
    };

    const formData = new FormData();
    formData.append('utf', '✓');
    formData.append('document_upload[file]', files[0]);
    formData.append('document_upload[collection_id]', '3');
    
    this.uploadService.upload(formData).subscribe(r => {
      console.log('uploaded');
    });

  }

}
