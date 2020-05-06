import { HeaderService } from './../../../../services/sharedData/header.service';
import { Component, OnInit, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';
declare const MStepper: any;

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent implements OnInit,OnChanges {
  @ViewChild('.stepper') stepper: ElementRef;
  @Input() stepNumber = 0;

  constructor(private headerService: HeaderService) { }

  ngOnChanges(changes){
   
  }
  ngOnInit() {

  }

}
