import { SemanticUtils } from './../../utils/semantic-utils';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from 'app/services/search/search.service';
import { SemanticModelService } from 'app/services/semantic-model/semantic-model.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild('referenceDetailModal') referenceDetailModal;
  @ViewChild('semanticSearchInput') semanticSearchInput;

  semanticEntities = []
  semanticEntity: any
  referencesGroups: any = []
  referencedSlugs:String[] = []

  isNewSearch = false

  constructor(private searchService: SearchService, private semanticModelService: SemanticModelService) {
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

  selectSemanticEntity(semanticEntity) {
    this.semanticEntity = semanticEntity;
    this.isNewSearch = false
    this.doSemanticSearch();
  }

  semanticEntitiesChange() {
    this.isNewSearch = true
  }

  openSelectedEntityDetail() {
    if (!this.semanticEntity.fullEntity) {
      this.semanticModelService.getEntity(this.semanticEntity.entityId.value, false).subscribe(response => {
        this.semanticEntity.fullEntity = JSON.stringify(response)
        this.referenceDetailModal.open({ semanticContribution: { slug: SemanticUtils.extractTranscriptorUrlPrefix(this.semanticEntity["entityId"]["value"]),schema_type: this.semanticEntity["entityType"]["value"],text: this.semanticEntity.fullEntity }},null,false)
      });
    } else {
      this.referenceDetailModal.open({ semanticContribution: { text: this.semanticEntity.fullEntity } })
    }
  }

  clearSelectedEntity() {
    this.semanticEntity = null
    this.isNewSearch = true
    this.referencesGroups =  []
    this.referencedSlugs = []
  }
}
