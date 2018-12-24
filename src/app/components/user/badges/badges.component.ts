import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {SimpleGlobal} from 'ng2-simple-global';
import { BadgeService } from '../../../services/badge/badge.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss']
})
export class BadgesComponent implements OnInit {

  badges:any[] = [];
  user = {};
  constructor(private badgeService:BadgeService,private userService: UserService, public global: SimpleGlobal,private changeDetector: ChangeDetectorRef) {
    this.badges = badgeService.list().subscribe(badges => {this.badges=badges;console.log(this.badges);});

  }

  ngOnInit() {
    let storedUser=localStorage.getItem('currentUser');
    if(storedUser!=null){
      this.user=JSON.parse(storedUser);
    }
  }

  loadRankUser() {
    if(this.user){
      this.setUser(this.user);
      this.userService.userInfoMetagame(this.user)
          .subscribe(response => this.handleResponseMG(this.user,response));
    }

  }

  private handleResponseMG(user,response) {
    if(response){
      user.rank=response;
      this.setUser(user);
    }

  }

  private setUser(user){
    this.global['currentUser'] = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.changeDetector.detectChanges();
  }


}
