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
  
  // deprecated
  public static isNextToSelectionPrimary(selector, parentClass, contains = false){
    let selection = rangy.getSelection();
    let elementToEval = $(selection.focusNode.nextSibling);
    console.log($(selection.focusNode));
    console.log(selection.focusOffset);
    console.log( selection.focusNode['length'] );
    if(elementToEval[0].localName == 'br'){
      elementToEval.after('&nbsp;');
      return false;
    }
    // $(selection.focusNode.childNodes[selection.focusOffset]).is(selector)
    if(!$(selection.focusNode).hasClass(parentClass)){
      let isNeightbor = elementToEval.is(selector);
      if(!isNeightbor && contains){
        isNeightbor = elementToEval.find(selector).length != 0;
      }
      if(selection.isCollapsed 
        && selection.focusOffset == selection.focusNode['length'] 
        && isNeightbor){
        return true;
      }
      return false;
    }
    if($(selection.focusNode.childNodes[selection.focusOffset]).is('br')){//.text() == " "
      $(selection.focusNode.childNodes[selection.focusOffset]).replaceWith('&zwnj;');
    } else {
      selection.getAllRanges()[0].insertNode(document.createTextNode(" "));
    }
    return false;
  }
  
  public static isNextToSelection(selector, parentClass, contains = false){
    let selection = rangy.getSelection();
    if(selection.isCollapsed){
      let focusNode = selection.focusNode;
      let fixed = false; 
      if($(focusNode).hasClass(parentClass)){
        focusNode = focusNode.childNodes[selection.focusOffset];
        fixed = true;
      }
      let elementToEval = $(focusNode.nextSibling);
      if($(focusNode).is(selector) || $(focusNode).find(selector).length != 0){
        return true;
      } else {
        if(fixed || selection.focusOffset == focusNode['length']){
          $(focusNode).replaceWith(' ' + focusNode.textContent + '&zwnj;');
        }
        return false;
      }
    }
    return false;
  }
  
  public static isPreviousToSelection(selector, parentClass, contains = false){
    let selection = rangy.getSelection();
    if(!$(selection.focusNode).hasClass(parentClass)){
      let elementToEval = $(selection.focusNode.previousSibling);
      let isNeightbor = elementToEval.is(selector);
      if(!isNeightbor && contains){
        isNeightbor = elementToEval.find(selector).length != 0;
      }
      if(selection.isCollapsed 
        && selection.focusOffset == 0 
        && isNeightbor){
        return true;
      }
      return false;
    }
    return true;
  }
  
  public static insertText(text){
    let selection = rangy.getSelection();
    selection.getAllRanges()[0].insertNode(document.createTextNode(text));
  }
  
  public static getRangy() {
    return rangy;
  }
}
