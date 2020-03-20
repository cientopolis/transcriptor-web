export class SemanticTranscriptionStrategy {
  
  static allowAutoZoom:boolean = true;
  
  static afterAssign(component){
  }
  
  static execute(renderedMark, component){
    // alert('lalala')
    component.renderedMark = renderedMark;
    component.changeDetector.detectChanges();
  }
}
