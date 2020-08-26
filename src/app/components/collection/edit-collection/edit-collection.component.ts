import { AdminService } from './../../../services/admin/admin.service';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

import { CollectionService } from '../../../services/collection/collection.service';
import { environment } from 'environments/environment';

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
  exportUri: string;


  public currentPage = 1;
  public itemsPerPage = 10;
  public totalItems = 0;
  public users: any;
  public itemsloaded = false;
  public headers = [
    { title: 'login', key: 'login' },
    { title: 'email', key: 'email' },
    { title: 'Owner', key: 'isOwner' }
  ];
  public headersActions = ['']
  public user: any;

  constructor(private collectionService: CollectionService) { }

  ngOnInit() {}

  changePage(event) {
    this.listUsers(event);
  }
  handleSearch(event) {
    this.listUsers(event.page, event.text);
  }
  handleChecked(event){
    console.log(event);
    this.collectionService.editOwners(this.collection, {users:[{ id: event.item.id, isOwner: event.item.isOwner }]}).subscribe(response => {
      console.log(response);
    })
  }
  listUsers(page, search = '') {
    this.itemsloaded = false;
    this.collectionService.listUsers(this.collection.id,search, page).subscribe(response => {
      this.currentPage = response.currentPage;
      this.itemsPerPage = response.itemsPerPage;
      this.totalItems = response.totalItems;
      this.users = response.items;
      this.itemsloaded = true;
    });
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes.collection) {
      this.collectionCopy = Object.assign({}, this.collection)
      if(this.collection) {
        this.listUsers(1);
        this.exportUri = `${environment.apiUrl}/api/collection/${this.collection.id}/export_as_rdf`
      }
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
