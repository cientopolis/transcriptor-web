import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scheme_type'
})
export class SchemePipe implements PipeTransform {

  transform(value: string): any {
    console.log(value);
    if(value!=null){
      let res = value.split('/');
      let type = res[res.length - 1].replace('"','');
      return type;
    }else{
      return "-";
    }
  }

}
