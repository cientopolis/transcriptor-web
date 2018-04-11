import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';

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
  collectionId:any;
  tips:string[];
  
  constructor(
    private uploadService: UploadService, 
    private collectionService: CollectionService, 
    private flashMessagesService: FlashMessagesService,
    private translate:TranslateService) {}
  
  ngOnInit() {
    this.collectionService.listOwn().subscribe(collections => this.collections = collections);
    this.loadTips();
  }
  
  upload() {
    const files: FileList = this.fileInput.nativeElement.files;
    if (files.length === 0 || isNaN(this.collectionId) || this.collectionId === null || this.collectionId === '') { 
      this.flashMessagesService.addI18n('upload.validationMessages.noFileSelected');
      return; 
    };

    const formData = new FormData();
    formData.append('utf', '✓');
    formData.append('document_upload[file]', files[0]);
    formData.append('document_upload[collection_id]', this.collectionId + '');
    
    this.uploadService.upload(formData).subscribe(r => {
      this.reset();
    });
  }

  reset() {
    $('#document_upload_file').val('');
    $('#document_upload_path').val('');
    this.collectionId = '';
  }
  
  loadTips(){
    this.translate.get('upload.tips.lines').subscribe((tips: string[]) => {
      this.tips=tips;
    });
  }
}
