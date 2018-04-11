export class TextEditorTranscriptionStrategy {
  
  static allowAutoZoom:boolean = false;
  
  static afterAssign(component){
    this.showMarkCreationToast(component);
    $('.leaflet-draw-draw-polyline').get(0).click();
    window.scrollTo(0,0);
  }
  
  static execute(renderedMark, component){
    renderedMark.mark.transcription_text = component.textEditor.getSelectedText();
    component.renderedMark = renderedMark;
    component.addModalMark();
  }
  
  private static showMarkCreationToast(component){
    component.flashMessagesService.clear();
    component.translate.get('app.button.cancel').subscribe((buttonText: string) => {
      let cancelButton = '<button class="btn-flat toast-action cancel-creation-button">' + buttonText + '</button>';
      component.flashMessagesService.addI18nFixed('transcribe.textEditor.message.markLineInPage', cancelButton);
      $('.cancel-creation-button').click(function(){
        $('.leaflet-draw-actions>li>a').last().get(0).click();
      });
    })
  }
}
