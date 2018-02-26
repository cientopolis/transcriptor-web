import { Component, OnInit } from '@angular/core';

import { FlashMessagesService } from '../../../services/util/flash-messages/flash-messages.service';

@Component({
  selector: 'app-flash-messages',
  templateUrl: './flash-messages.component.html',
  styleUrls: ['./flash-messages.component.scss']
})
export class FlashMessagesComponent implements OnInit {

  constructor(public flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

}
