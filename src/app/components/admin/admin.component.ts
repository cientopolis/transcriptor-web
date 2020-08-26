import { User } from './../../models/user';
import { UserService } from './../../services/user/user.service';
import { AdminService } from './../../services/admin/admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  @ViewChild('modalEditUserFromAdmin') editModal;
  public currentPage = 1;
  public itemsPerPage = 10;
  public totalItems = 0;
  public users : any;
  public itemsloaded = false;
  public headers = [
          { title: 'login', key: 'login' }, 
          { title: 'email', key: 'email'},
          { title: 'registered', key:'created_at'},
          { title: 'Owner', key:'owner'},
          { title: 'Admin', key: 'admin'}
        ];
  public user : any;

  constructor(private admService: AdminService, private userService: UserService) { }

  ngOnInit() {
    this.listUsers(1);
  }
  changeOwner(event){
  }

  handleModal(event) {
    this.user = null;
    if(event.modal=='edit'){
      this.user = new User(event.item);
      this.editModal.openModal();
    }
    if (event.modal == 'delete'){
      this.user = new User(event.item);
      this.remove();
    }
  }

  changePage(event) {
    this.listUsers(event);
  }
  handleSearch(event){
    this.listUsers(event.page,event.text);
  }


  listUsers(page,search=''){
    this.itemsloaded=false;
    this.admService.listUsers(search,page).subscribe(response =>{
      this.currentPage = response.currentPage;
      this.itemsPerPage = response.itemsPerPage;
      this.totalItems = response.totalItems;
      this.users=response.items;
      this.itemsloaded=true;
    });
  }

  edit(){
    this.userService.edit(this.user).subscribe(response => this.handleResponse(response));
  }

  remove() {
    this.userService.delete(this.user).subscribe(response => 
      this.handleResponse(response)
      );
  }

  private handleResponse(user) {
    this.listUsers(this.currentPage,'');
    this.user=null;
  }
}
