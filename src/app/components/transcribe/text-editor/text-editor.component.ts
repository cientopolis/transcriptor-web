import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import * as $ from 'jquery';
import * as _ from 'lodash';

import { MarkService } from '../../../services/mark/mark.service';

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
  
  editorConfig = {
    minHeight:"73vh"
  }
  
  constructor(private markService: MarkService) { }

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes.page.currentValue != null && changes.page.currentValue != changes.page.previousValue){
      this.loadMarks(this.page.id);
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
      var element = '<span class="contribution-mark-'+ mark.id + '">'+ mark.transcription.text + '</span>';
      this.htmlContent = this.htmlContent + element;
    });
  }
  
  onFocus() {
    let component = this;
    $("[class^='contribution-mark-']").unbind('click');
    $("[class^='contribution-mark-']").on('click', function(e){
      var markId=component.obtainIdFromClass(this.className);
      component.clickText.emit(markId);
      e.stopPropagation();
    });
  }
  
  private obtainIdFromClass(className) {
    var classes = className.split(' ');
    var markClass = _.find(classes, function(clazz){ 
      return _.startsWith(clazz,'contribution-mark-');
    });
    return parseInt(markClass.replace('contribution-mark-',''));
  }
}
