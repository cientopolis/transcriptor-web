import * as $ from 'jquery';
import * as rangy from 'rangy';

export class RangeUtils {
  
  public static containsSelection(selector, partial = true){
    let match = false;
    $(selector).each(function(){
      if(rangy.getSelection().containsNode(this,partial)){
        match = true;
        return false;
      }
    });
    return match;
  }
  
  public static isNextToSelection(selector, contains = false){
    let selection = rangy.getSelection();
    let elementToEval = $(selection.focusNode.nextSibling);
    let isNeightbor = elementToEval.is(selector);
    if(!isNeightbor && contains){
      isNeightbor = elementToEval.find(selector).length != 0;
      console.log(isNeightbor);
    }
    console.log(selection.focusOffset == selection.focusNode.length);
    if(selection.isCollapsed 
      && selection.focusOffset == selection.focusNode.length 
      && isNeightbor){
      return true;
    }
    return false;
  }
  
  public static isPreviousToSelection(selector, contains = false){
    let selection = rangy.getSelection();
    let elementToEval = $(selection.focusNode.previousSibling);
    let isNeightbor = elementToEval.is(selector);
    if(!isNeightbor && contains){
      isNeightbor = elementToEval.find(selector).length != 0;
      console.log(isNeightbor);
    }
    if(selection.isCollapsed 
      && selection.focusOffset == 0 
      && isNeightbor){
      return true;
    }
    return false;
  }
  
  public static getRangy() {
    return rangy;
  }
}
