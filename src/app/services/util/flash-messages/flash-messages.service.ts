import { Injectable } from '@angular/core';

import { MzToastService } from 'ng2-materialize';

@Injectable()
export class FlashMessagesService {

  constructor(private toastService: MzToastService) { }

  add(message: string, displayLength = 4000) {
    this.toastService.show(message, displayLength);
  }
  
  addFixed(message: string) {
    this.toastService.show(message, NaN);
  }
  
  clear() {
    Materialize.Toast.removeAll();
  }
  
}
