import { Component, OnInit } from '@angular/core';
import {SimpleGlobal} from 'ng2-simple-global';

import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Transcriptor';
  
  constructor(private loginService: LoginService, private global: SimpleGlobal) {}
  
  ngOnInit() {
    //usar interceptor
    let storedUser=localStorage.getItem('currentUser');
    if(storedUser != null){
      this.setUser(JSON.parse(storedUser));
    }
  }
  
  logout() : void {
    localStorage.removeItem('currentUser');
    this.global['currentUser'] = null;
  }
  
  private setUser(user){
    this.global['currentUser'] = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}
