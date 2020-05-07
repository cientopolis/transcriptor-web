import { HeaderService } from './../../../../services/sharedData/header.service';
import { Component, OnInit, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';


@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent implements OnInit,OnChanges {


  constructor(public headerService: HeaderService) { }

  ngOnChanges(changes){
   
  }
  ngOnInit() {

  }

}
