import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from 'app/services/search/search.service';
import { MarkService } from 'app/services/mark/mark.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild('referenceDetailModal') referenceDetailModal;

  semanticEntity: any
  referencesGroups: any = []
  referencedSlugs:String[] = []

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
  }

  doSemanticSearch() {
    let entityId = this.semanticEntity["entityId"]["value"]
    this.searchService.listSemanticReferences({ entityId: entityId }).subscribe(res => {
      this.referencedSlugs = res.referenced_slugs
      this.referencesGroups = res.references
    })
  }

}
