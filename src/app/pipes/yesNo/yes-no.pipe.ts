import { TranslateService } from '@ngx-translate/core';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo'
})
export class YesNoPipe implements PipeTransform {
  constructor(private translate: TranslateService){

  }

  transform(value: any): any {
    if(value!=true && value !=false){
      return value;
    }
    return value ? this.translate.instant('pipes.yesNo.yes') : this.translate.instant('pipes.yesNo.no');
  }

}
