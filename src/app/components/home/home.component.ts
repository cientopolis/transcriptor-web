import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(public global: SimpleGlobal) { }

  ngOnInit() {
  }

}
