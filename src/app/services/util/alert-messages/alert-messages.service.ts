import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Ng2IzitoastService } from 'ng2-izitoast';

@Injectable()
export class AlertMessagesService {

  private static defaultOptions:any = {
      theme: 'dark',
      icon: '',
      position: 'bottomCenter',
      transitionIn: 'flipInX',
      transitionOut: 'flipOutX',
      progressBarColor: '#ffb300',
      image: '/assets/img/icons/cientopolis-logo.jpg',
      imageWidth: 70,
      layout: 2,
      onClosing: function(){},
      onClosed: function(instance, toast, closedBy){},
      iconColor: '#ffb300'
  }

  constructor(private iziToast: Ng2IzitoastService, private translate:TranslateService) { }

  add(title: string, message: string, options:any = {}) {
    this.iziToast.show(
      this.getAlertOptions(title,message,options));
  }
  
  addFixed(title: string, message: string, options:any = {}) {
    options.timeout=false;
    this.add(title, message, options);
  }
  
  addI18n(titleKey: string, messageKey: string, options:any = {}) {
    this.translate.get([titleKey, messageKey]).subscribe((translations:any) => {
      let values = Object.values(translations);
      this.add(values[0],values[1],options);
    });
  }
  
  addI18nFixed(titleKey: string, messageKey: string, options:any = {}) {
    options.timeout=false;
    this.addI18n(titleKey, messageKey, options);
  }
  
  clear() {
  }
  
  private getAlertOptions(title, message, options) {
    options.title = title;
    options.message = message;
    return Object.assign({},this.getDefaultOptions(),options);
  }
  
  private getDefaultOptions(){
    return JSON.parse(JSON.stringify(AlertMessagesService.defaultOptions));
  }
}
