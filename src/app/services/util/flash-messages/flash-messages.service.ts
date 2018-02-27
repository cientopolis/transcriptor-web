import { Injectable } from '@angular/core';

import { MzToastService } from 'ng2-materialize';

@Injectable()
export class FlashMessagesService {

  constructor(private toastService: MzToastService) { }

  add(message: string) {
    this.toastService.show(message, 4000);
  }
  
}
