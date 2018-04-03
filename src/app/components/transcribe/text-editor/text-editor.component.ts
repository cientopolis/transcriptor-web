import { Component, OnInit, OnChanges, AfterViewInit, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';

import * as $ from 'jquery';
import * as _ from 'lodash';

import { MarkService } from '../../../services/mark/mark.service';
import { TranscribeService } from '../../../services/transcribe/transcribe.service';
import { FlashMessagesService } from '../../../services/util/flash-messages/flash-messages.service';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  
  htmlContent = '';
  marks = [];
  @Input() page = null;
  @Output() clickText = new EventEmitter();
  @Output() pressTextMarkButton = new EventEmitter();
  selectedText = null;
  waitingMark = false;
  elementToReplace = null;
  @ViewChild('textEditor') textEditor;
  
  editorConfig = {
    editable:true,
    height:"73vh",
    minHeight:"73vh",
    toolbar: [
      ["bold", "italic", "underline", "strikeThrough"],
      ["fontSize", "color"],
      ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
      ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
      ["blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
      ["link", "unlink"],
      ["code"]
    ]
  }
  
  focusedText:any;
  currentSelection:any;
  
  private separator = ' ';
  
  constructor(private markService: MarkService, private transcribeService:TranscribeService, private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    let component=this;
    $(".ngx-editor-textarea").keydown(function(e){
      // trap the return key being pressed
      if (e.keyCode === 13) {
        if(window.getSelection().focusNode['nextElementSibling']){
          document.execCommand('insertHTML', false, '<br>');
        } else {
          document.execCommand('insertHTML', false, '<br>&zwnj;');
        }
        return false;
      }
    });
    
    $(".ngx-editor-textarea").keyup(function(e){
      component.focusText();
      component.cutFinalBreakline();
      component.setFinalSeparator();
    });
    
    $(".ngx-editor-textarea").click(function(e){
      component.focusText();
      component.setFinalSeparator();
    });
  }
  
  ngAfterViewInit() {
    let component = this;
    $('.ngx-toolbar').append("<div class='ngx-toolbar-set'><button id='add-text-mark-button' class='ngx-editor-button' title='Add Text Mark' type='button'><i class='fa fa-bookmark'></i></button></div>");
    $('#add-text-mark-button').click(function(){
      component.onTextMarkButton();
    });
    $('.ngx-editor-button').on('mousedown',function(){
      component.cutFinalBreakline();
    })
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes.page.currentValue != null && changes.page.currentValue != changes.page.previousValue){
      if(this.page.source_text != null && this.page.source_text != ''){
        this.htmlContent = this.page.source_text
      } else {
        this.loadMarks(this.page.id);
      }
    }
  }
  
  loadMarks(pageId) {
    this.markService.listByPage(pageId)
      .subscribe(marks => {
        this.marks = marks;
        this.loadText();
      });
  }
  
  loadText() {
    this.marks.forEach(mark => {
      this.createTextElement(mark);
    });
  }
  
  onFocus() {
    let component = this;
    $("[class^='contribution-mark-']").unbind('click');
    $("[class^='contribution-mark-']").click(function(e){
      if(component.isSimpleRangeSelection()){
        component.focusText();
        var markId=component.obtainIdFromClass(this.className);
        component.clickText.emit(markId);
      }
      e.stopPropagation();
    });
  }
  
  save() {
    this.refreshText();
    var pageTranscriptionData = {
      page:{
        source_text: this.htmlContent
      },
      save: true
    };
    this.transcribeService.save(this.page.id, pageTranscriptionData)
      .subscribe(pageTranscription => {});
  }
  
  addMarkText(mark) {
    this.createTextElement(mark);
    this.save();
  }

  private obtainIdFromClass(className) {
    var classes = className.split(' ');
    var markClass = _.find(classes, function(clazz){ 
      return _.startsWith(clazz,'contribution-mark-');
    });
    return parseInt(markClass.replace('contribution-mark-',''));
  }

  private createTextElement(mark) {
    var element = '<span class="contribution-mark-'+ mark.id + '">'+ mark.transcription.text + '</span>';
    if(this.elementToReplace == null){
      // The text come from the modal
      this.htmlContent = this.htmlContent + element;
      this.htmlContent = this.htmlContent + this.separator;
    } else {
      // The text come the editor
      this.enableEditor();
      $('.replaceable').replaceWith(element);
      this.elementToReplace=null;
      this.refreshText();
    }
  }
  
  private focusText(){
    if(this.focusedText && this.focusedText != window.getSelection().focusNode.parentNode){
      this.focusedText.classList.remove('selected');
    }
    this.focusedText = window.getSelection().focusNode.parentNode;
    this.focusedText.classList.add('selected');
  }
  
  onTextMarkButton(){
    if(window.getSelection().toString()){
      this.waitingMark = true;
      this.selectedText = window.getSelection? window.getSelection().toString() : '';
      this.prepareToReplaceSelection();
      this.pressTextMarkButton.emit(this.getSelectedText());
      this.disableEditor();
    } else {
      this.flashMessagesService.add('You must select text to add a mark!');
    }
  }
  
  getSelectedText() {
    return this.selectedText;
  }
  
  private prepareToReplaceSelection(){
    var sel = window.getSelection();
    if (sel.toString() != "") {
      var selectedElement= sel.focusNode;
      var selectedText = sel.toString();
      
      var fullElementText = selectedElement.textContent;
      var pointStart = sel.anchorOffset;
      var pointEnd = sel.focusOffset;
      
      if(pointEnd < pointStart) {;
        pointStart = pointEnd;
      }
      
      var firstHalf = fullElementText.substring(0,pointStart);
      var lastHalf = fullElementText.substring(pointStart + selectedText.length,fullElementText.length);
      var newElement = firstHalf+"<span class='replaceable'>"+selectedText+"</span>"+lastHalf;
      
      $(selectedElement).before(newElement);
      
      this.elementToReplace = $('.replaceable');
      selectedElement.textContent = '';
    }
    this.refreshText();
  }
  
  refreshText(){
    this.htmlContent = this.textEditor.textArea.nativeElement.innerHTML;
    this.setFinalSeparator();
  }
  
  private setFinalSeparator(){
    if(_.endsWith(this.htmlContent,'</span>')){
      this.htmlContent = this.htmlContent + this.separator;
    }
  }
  
  private cutFinalBreakline(){
    if(_.endsWith(this.htmlContent,'<br>')){
      $('.ngx-editor-textarea>br:last').remove();
    }
  }
  
  private setRangeToEnd() {
    let el = $('.ngx-editor-textarea')[0];
    var range = document.createRange();
    var sel = window.getSelection();
    var lastNodeIndex=el.childNodes.length - 1;
    range.setStart(el.childNodes[lastNodeIndex], 0);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }
    
  private saveSelection() {
    if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            this.currentSelection = sel.getRangeAt(0);
        }
    } else if (document['selection'] && document['selection'].createRange) {
        this.currentSelection = document['selection'].createRange();
    }
    this.currentSelection = null;
  }

  private restoreSelection() {
    var range = this.currentSelection;
    if (range) {
      if (window.getSelection) {
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
      } else if (document['selection'] && range.select) {
          range.select();
      }
    }
  }
  
  private isSimpleRangeSelection(){
    var selection= window.getSelection();
    return selection.anchorOffset == selection.focusOffset;
  }
  
  enableEditor(){
    this.editorConfig.editable = true;
    $('.ngx-editor-button').prop('disabled', false);
  }
  
  disableEditor(){
    this.editorConfig.editable = false;
    $('.ngx-editor-button').prop('disabled', true);
  }
}
