import { Component, OnInit } from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent implements OnInit {

  showInfo = false

  constructor(public global: SimpleGlobal) { }

  ngOnInit() {
  }

  toggleInfo() {
    this.showInfo = !this.showInfo
  }
}
