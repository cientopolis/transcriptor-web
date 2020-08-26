import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginated-list',
  templateUrl: './paginated-list.component.html',
  styleUrls: ['./paginated-list.component.scss']
})
export class PaginatedListComponent implements OnInit {

  @Input() public currentPage = 0;
  @Input() public itemsPerPage = 0;
  @Input() public totalItems = 0;
  @Input() public items : any;
  @Input() public headers = ['login','display name'];
  @Input() public headersActions = ['edit','delete'];
  @Input() public checkbox = false;
  @Output() public openModalEvent = new EventEmitter<any>();
  @Output() public pageChange = new EventEmitter<any>();
  @Output() public searchInputChange = new EventEmitter<any>();
  @Output() public checkedEvent = new EventEmitter<any>();

  public searchInput = '';

  constructor() { }

  ngOnInit() {}

  handleChecked(user,event){
    this.checkedEvent.emit({item: user });
  }
  clear(){
    this.searchInput='';
    this.search();
  }
  onPageChange(page){
    this.pageChange.emit(page)
  }
  openModal(modal,item){
    this.openModalEvent.emit({modal:modal,item:item});
  }

  search(){
    this.searchInputChange.emit({ page: this.currentPage,text:this.searchInput});
  }


}
