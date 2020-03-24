import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { MzToastService } from 'ngx-materialize';

@Injectable()
export class FlashMessagesService {

  constructor(private toastService: MzToastService, private translate:TranslateService) { }

  add(message: string, displayLength = 4000) {
    this.toastService.show(message, displayLength);
  }
  
  addFixed(message: string) {
    this.toastService.show(message, NaN);
  }
  
  addI18n(key: string, displayLength = 4000, html = ''){
    this.translate.get(key).subscribe((res: string) => {
      this.add(res + html);
    });
  }
  
  addI18nFixed(key: string, html = ''){
    this.translate.get(key).subscribe((res: string) => {
      this.addFixed(res + html);
    });
  }
  
  clear() {
    Materialize.Toast.removeAll();
  }
  
}
