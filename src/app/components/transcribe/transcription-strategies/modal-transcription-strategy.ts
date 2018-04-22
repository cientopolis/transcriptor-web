export class ModalTranscriptionStrategy {
  
  static allowAutoZoom:boolean = true;
  
  static afterAssign(component){
  }
  
  static execute(renderedMark, component){
    component.openMarkModalByRole(renderedMark);
  }
}
