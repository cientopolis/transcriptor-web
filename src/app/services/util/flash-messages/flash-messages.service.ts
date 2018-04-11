import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { MzToastService } from 'ng2-materialize';

@Injectable()
export class FlashMessagesService {

  constructor(private toastService: MzToastService, private translate:TranslateService) { }

  add(message: string, displayLength = 4000) {
    this.toastService.show(message, displayLength);
  }
  
  addFixed(message: string) {
    this.toastService.show(message, NaN);
  }
  
  addI18n(key: string, displayLength = 4000){
    this.translate.get(key).subscribe((res: string) => {
      this.add(res);
    });
  }
  
  addI18nFixed(key: string){
    this.translate.get(key).subscribe((res: string) => {
      this.addFixed(res);
    });
  }
  
  clear() {
    Materialize.Toast.removeAll();
  }
  
}
