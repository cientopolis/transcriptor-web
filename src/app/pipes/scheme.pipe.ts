import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scheme_type'
})
export class SchemePipe implements PipeTransform {

  transform(value: string): any {
    if(value!=null){
      console.log(value);
      let res;
      if(value.includes(':')){
        if (value.includes('/')){
          res = value.split('/');
        }else{
          res = value.split(':');
        }
      }
      let type;
      if(res){
        let type = res[res.length - 1].replace('"', '');
        return type;
      }else{
        return value;
      }
     
    }else{
      return "-";
    }
  }

}
