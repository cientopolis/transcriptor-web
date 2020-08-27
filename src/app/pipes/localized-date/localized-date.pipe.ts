import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
@Pipe({
  name: 'localizedDate',
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {

  constructor(private translateService: TranslateService) {
  }

  transform(value: any, pattern: string = 'mediumDate'): any {
    const datePipe: DatePipe = new DatePipe(this.translateService.currentLang);
    return datePipe.transform(value, pattern);
  }

}