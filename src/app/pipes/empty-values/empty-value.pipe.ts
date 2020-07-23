import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyValue'
})
export class EmptyValuePipe implements PipeTransform {

  transform(value: string): any {
    if(!value || value ==''){
      return '-';
    }
    return value;
  }

}
