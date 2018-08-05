import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';

import * as _ from "lodash";
import * as jsDiff from 'diff';
import { Diff2Html } from 'diff2html';

import { PageService } from '../../services/page/page.service';
import { PageVersionService } from '../../services/page-version/page-version.service';

@Component({
  selector: 'app-page-version',
  templateUrl: './page-version.component.html',
  styleUrls: ['./page-version.component.scss']
})
export class PageVersionComponent implements OnInit {

  pageId:any;
  page:any = null;
  pageVersion:any = null;
  pageVersions:any = [];
  diffString:string;
  outputHtml: string;

  constructor( 
    private route:ActivatedRoute,
    private global:SimpleGlobal, 
    private pageService:PageService,
    private pageVersionService:PageVersionService) {
      this.pageId = +this.route.snapshot.paramMap.get('pageId');
      this.global['routeBack'] = "transcribe/"+this.pageId;
    }

  ngOnInit() {
    this.loadPage(this.pageId);
  }
  
  ngOnDestroy() {
    this.global['routeBack'] = null;
  }
  
  loadPage(pageId) {
    this.pageService.get(pageId)
        .subscribe(page => {
          this.page = page;
          if(this.page.source_text != null){
            this.page.source_text = this.processHTML(this.page.source_text); 
            this.loadPageVersions(pageId);
          }
        });
  }
  
  loadPageVersions(pageId) {
    this.pageVersionService.listByPage(pageId, {fields:[":username"]})
        .subscribe(pageVersions => {
          this.pageVersions = pageVersions;
          if(this.pageVersions.length > 1){
            this.pageVersion = pageVersions[1];
            this.diffVersion();
          } else {
            if(this.pageVersions.length > 0){
              this.pageVersion = pageVersions[0];
              this.diffVersion();
            }
          }
        });
  }
  
  diffVersion() {
    this.diffString = jsDiff.createPatch(this.page.title, this.page.source_text, this.processHTML(this.pageVersion.transcription));
    let outputHtml = Diff2Html.getPrettyHtml(this.diffString, {inputFormat: 'diff', showFiles: false, matching: 'words', outputFormat: 'side-by-side'});
    this.outputHtml = outputHtml;
  }

  private processHTML(html){
    return html.replace(/<br>/g, '\n').replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, ' ');
  }
}
