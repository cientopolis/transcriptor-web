import * as _ from 'lodash';

export class TextUtils {
  
  public static endsWith(text, possibleEndings){
    let match = false;
    possibleEndings.forEach(ending => {
      if(_.endsWith(text, ending)){
        match = true; 
        return true;
      }
    });
    return match;
  }
}
