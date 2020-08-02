import { Component, OnInit, OnChanges, AfterViewInit, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Sortable } from '@shopify/draggable';

import * as $ from 'jquery';
import * as _ from 'lodash';
import * as rangy from 'rangy';

import { TextEditorTranscriptionStrategy } from '../transcription-strategies/text-editor-transcription-strategy';

import { MarkService } from '../../../services/mark/mark.service';
import { TranscribeService } from '../../../services/transcribe/transcribe.service';
import { FlashMessagesService } from '../../../services/util/flash-messages/flash-messages.service';

import { TextUtils } from '../../../utils/text-utils';
import { RangeUtils } from '../../../utils/range-utils';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  
  htmlContent = '';
  marks = [];
  @Input() page = null;
  @Input() transcribeStrategy = null;
  @Output() transcribeStrategyChange = new EventEmitter();
  @Output() clickText = new EventEmitter();
  selectedText = null;
  waitingMark = false;
  elementToReplace = null;
  @ViewChild('textEditor') textEditor;
  
  editorConfig = {
    editable:true,
    height: false,
    minHeight: false,
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
  private separator = '&nbsp;';
  
  sortable = null;
  textSortEnabled = false;
  
  mark_blank:boolean = false;
  needs_review:boolean = false;
  transcribed:boolean = false;
  
  constructor(
    private markService: MarkService, 
    private transcribeService:TranscribeService,
    private flashMessagesService: FlashMessagesService,
    private translate:TranslateService) { }

  ngOnInit() {
    window['rangy'] = rangy;
    let component=this;
    $(".ngx-editor-textarea").keydown(function(e){
      // trap the key being pressed
      switch(e.keyCode) {
          case 13: //catch the "enter" key
            // if(window.getSelection().focusNode['nextElementSibling']){
            //   document.execCommand('insertHTML', false, '<br>');
            // } else {
            //   document.execCommand('insertHTML', false, '<br>&zwnj;');
            // }
            document.execCommand('insertHTML', false, '<br>&zwnj;');
            return false;
          case 8: //catch the "backspace" key
            if(RangeUtils.isPreviousToSelection("[class^='contribution-mark-']","ngx-editor-textarea",true)){ return false };
            if(RangeUtils.containsSelection("[class^='contribution-mark-']")){ return false };
            break;
          case 46: //catch the "del" key
            if(RangeUtils.isNextToSelection("[class^='contribution-mark-']","ngx-editor-textarea",true)){ return false };
            if(RangeUtils.containsSelection("[class^='contribution-mark-']")){ return false };
            break;
      }
    });
    
    $(".ngx-editor-textarea").keyup(function(e){
      component.refreshPrompt();
    });
    
    $(".ngx-editor-textarea").click(function(e){
      component.refreshPrompt();
    });
  }
  
  ngAfterViewInit() {
    let component = this;
    $('.ngx-toolbar').append("<div class='ngx-toolbar-set'><button id='order-text-mark-button' class='ngx-editor-button' title='Order Text' type='button'><i class='fa fa-arrows'></i></button></div>");
    $('#order-text-mark-button').click(function(){
      component.toggleTextOrder();
    });
    $('.ngx-toolbar').append("<div class='ngx-toolbar-set'><button id='add-text-mark-button' class='ngx-editor-button' title='Add Text Mark' type='button'><i class='fa fa-bookmark'></i></button></div>");
    $('#add-text-mark-button').click(function(){
      component.onTextMarkButton();
    });
    $('.ngx-editor-button').on('mousedown',function(){
      component.cutFinalBreakline();
    });
    $('.ngx-editor-textarea').one('mousedown',function(){
      component.onFocus();
    });
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes.page){
      if(changes.page.currentValue != null && !_.isEqual(changes.page.currentValue, changes.page.previousValue)){
        if(this.page.source_text != null && this.page.source_text != ''){
          // this.htmlContent = this.page.source_text;
          this.compileText();
          this.needs_review = this.page.status == 'review';
          this.mark_blank = this.page.status == 'blank';
          this.transcribed = this.page.status == 'transcribed';
        }
      }
    }
  }
  
  loadMarks(successFn) {
    this.markService.listByPage(this.page.id)
      .subscribe(marks => {
        this.marks = marks;
        successFn(marks);
      });
  }
  
  // Deprecated, used to load text using only marks
  loadText() {
    this.loadMarks(marks => {
      this.marks.forEach(mark => {
        this.createTextElement(mark);
      });
    });
  }
  
  compileText(){
    this.loadMarks(marks => {
      let marksData = {};
      this.marks.forEach(mark => {
        marksData['contributionMark'+mark.id] = mark.transcription.text;
      });
   
      _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
      var compiled = _.template(this.page.source_template);
      this.htmlContent = compiled(marksData);
    });
  }
  
  onFocus() {
    let component = this;
    $("[class^='contribution-mark-']").attr('contenteditable','false');
    $("[class^='contribution-mark-']").unbind('click');
    $("[class^='contribution-mark-']").click(function(e){
      $(this).attr('contenteditable','false');
      if(component.isSimpleRangeSelection()){
        component.focusText();
        var markId=component.obtainIdFromClass(this.className);
        component.clickText.emit(markId);
      }
      e.stopPropagation();
    });
  }
  
  save(refresh = true) {
    if(refresh) {
      this.refreshText();
    }
    var pageTranscriptionData = {
      page:{
        source_text: this.htmlContent,
        needs_review: this.needs_review ? '1' : '0',
        mark_blank: this.mark_blank ? '1' : '0',
        transcribed: this.transcribed ? '1' : '0'
      },
      save: true
    };
    this.transcribeService.save(this.page.id, pageTranscriptionData)
      .subscribe(pageTranscription => {
        this.page = pageTranscription;
        this.compileText();
      }); 
  }
  
  addMarkText(mark) {
    this.createTextElement(mark);
    this.save(false);
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
      // this.focusedText.classList.remove('selected');
      $('.ngx-editor-textarea .selected').removeClass('selected');
    }
    this.focusedText = window.getSelection().focusNode.parentNode;
    this.focusedText.classList.add('selected');
  }
  
  onTextMarkButton(){
    if(window.getSelection().toString()){
      this.waitingMark = true;
      this.selectedText = window.getSelection? window.getSelection().toString() : '';
      this.prepareToReplaceSelection();
      this.transcribeStrategy = TextEditorTranscriptionStrategy;
      this.transcribeStrategyChange.emit(this.transcribeStrategy);
      TextEditorTranscriptionStrategy.afterAssign(this);
      this.disableEditor();
    } else {
      this.flashMessagesService.addI18n('transcribe.textEditor.message.noTextSelected');
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
    this.cutFinalBreakline();
    this.setFinalSeparator();
    $('.ngx-editor-textarea>.selected').removeClass('selected');
    this.htmlContent = this.textEditor.textArea.nativeElement.innerHTML;
  }
  
  refreshPrompt(){
    this.focusText();
    this.cutFinalBreakline();
    this.setFinalSeparator();
  }
  
  cleanText(){
    $("[class^='contribution-mark-']").each(function(){
      let markToEval:any = $(this);
      if(markToEval.parent('.ngx-editor-textarea').length == 0){
          markToEval = markToEval.parent(); 
      }
      if(markToEval[0].nextSibling && !(_.includes(markToEval[0].nextSibling.nodeValue, "\u00A0") || _.includes(markToEval[0].nextSibling.nodeValue, " "))){
        markToEval.first().after('&nbsp;');
      }
    });
  }
  
  toggleTextOrder(){
    this.textSortEnabled = !this.textSortEnabled;
    if(this.textSortEnabled){
      // adds class .sortable to top level marks
      $(".ngx-editor-textarea>[class^='contribution-mark-']").addClass('sortable');
      // adds class .sortable to styled marks
      $("[class^='contribution-mark-']").parents().filter(function() {
        return $(this).parent().is('.ngx-editor-textarea');
      }).addClass('sortable');
      
      this.configureSortable();
    } else {
      $('.sortable').removeClass('sortable')
      this.sortable.destroy();
    }
    $('#order-text-mark-button').toggleClass('active');
    $('.ngx-editor-textarea').attr('contenteditable', !JSON.parse($('.ngx-editor-textarea').attr('contenteditable')) + '');
  }
  
  private configureSortable(){
    this.sortable = new Sortable($('.ngx-editor-textarea')[0], {
      draggable: '.sortable'
    });
    
    this.sortable.on('drag:stop', (event) => {
      this.cleanText();
    });
    
    this.sortable.on('sortable:sorted', (sortableEvent) => {
      const {source, over} = sortableEvent.dragEvent;
    
      // Can be done in a separate frame
      requestAnimationFrame(() => {
      });
    });
  }
  
  private setFinalSeparator(){
    if(TextUtils.endsWith($('.ngx-editor-textarea').html(),['</span>','</b>','</i>','</u>'])){
      $('.ngx-editor-textarea').append('&nbsp;');
    }
  }
  
  private cutFinalBreakline(){
    if(_.endsWith($('.ngx-editor-textarea').html(),'<br>')){
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
  
  // Method called from transcription component when focus a mark
  focusMark(markId) {
    $('.ngx-editor-textarea .selected').removeClass('selected');
    $('.contribution-mark-'+markId).addClass('selected');
  }
  
  blurMark() {
    $('.ngx-editor-textarea .selected').removeClass('selected');
  }
  
  update() {
    this.save();
  }

  refreshTranscriptionStatus(flagName) {
    var wantedValue = this[flagName];
    this.transcribed = false;
    this.needs_review =  false;
    this.mark_blank = false;
    this[flagName] = wantedValue;
  }
}
