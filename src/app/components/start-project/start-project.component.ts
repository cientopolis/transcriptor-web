import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-start-project',
  templateUrl: './start-project.component.html',
  styleUrls: ['./start-project.component.scss']
})
export class StartProjectComponent implements OnInit {

  @ViewChild('collectionCreationModal') collectionCreationModal: any;
  @ViewChild('uploadComponent') uploadComponent: any;

  constructor() { }

  ngOnInit() {
  }
  
  openNewCollectionModal(){
    this.collectionCreationModal.open();
  }
  
  onCreateCollection(){
    this.uploadComponent.update();
  }
}
