import { Component, OnInit, ViewChild } from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  
  @ViewChild('referenceDetailModal') referenceDetailModal;
  loaded = false
  
  constructor(public global: SimpleGlobal) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.loaded = true
    }, 500);
  }

  onShow() {
    $('.tabs-content.carousel').height($('.carousel-item.active .row').height());
  }
}
