import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import {SimpleGlobal} from 'ng2-simple-global';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild('modalEditProfile') modalEditProfile;
  user = {};

  constructor(private userService: UserService, private global: SimpleGlobal) { }

  ngOnInit() {
    let storedUser=localStorage.getItem('currentUser');
    if(storedUser!=null){
      console.log(storedUser);
      this.user=JSON.parse(storedUser);
    }
  }
  openModalEditProfile() {
    this.modalEditProfile.open();
  }

  updateUser() {
    this.userService.edit(this.user)
      .subscribe(response => this.handleResponse(response));

  }
  private handleResponse(user) {
    this.user=user;
    console.log(this.user);
    this.global['currentUser'] = this.user;

    localStorage.setItem('currentUser', JSON.stringify(this.user));
  }

}