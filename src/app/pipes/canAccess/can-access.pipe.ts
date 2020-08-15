import { AccessUtils } from './../../utils/access-utils';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'canAccess'
})
export class CanAccessPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return AccessUtils.canAccess(value);
  }

}
