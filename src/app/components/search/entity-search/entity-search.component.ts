import { SemanticUtils } from './../../../utils/semantic-utils';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SearchService } from 'app/services/search/search.service';
import { SemanticModelService } from 'app/services/semantic-model/semantic-model.service';
import { SearchComponent } from '../search.component';
import { OntologyPipe } from 'app/pipes/ontology.pipe';

@Component({
  selector: 'app-entity-search',
  templateUrl: './entity-search.component.html',
  styleUrls: ['./entity-search.component.scss']
})
export class EntitySearchComponent implements OnInit {

  @ViewChild('searchInput') searchInput;
  referencesGroups: any = []
  blockRequests = true
  advancedSearch = false

  classFilter = null
  relationFilter = null
  valueFilter = null

  semanticEntities = null

  @Input('parent') parent: SearchComponent

  constructor(private searchService: SearchService, private semanticModelService: SemanticModelService, private ontologyPipe: OntologyPipe) { }

  ngOnInit() {
    // this.doEntitySearch()
  }

  searchEntities($event = null) {
    this.blockRequests = false
    var filter = {
      searchQuery: $event && $event.searchText ? $event.searchText : this.constructQuery(),
      includeMatchedProperties: true
    }
    this.doEntitySearch(filter)
  }

  doEntitySearch(filter = {}) {
    this.searchService.listEntities(filter).subscribe(response => {
      console.log(response)
      var mappedEntities = []
      response.forEach(entity => {
        mappedEntities.push({ title: entity.entityLabel, description: this.ontologyPipe.transform(entity.entityType), miniDetail: this.setEntityPrefixes(entity.entityProperties), item: entity })
      });
      this.semanticEntities = mappedEntities
      // this.onFetchEnd.emit()
      // this.referencesGroups = response
      // this.resultsChange.emit(this.results)
      // this.searchInput.setResults(this.results)
    });
  }

  handleInvalidInput() {
    if (!this.blockRequests) {
      this.blockRequests = true
      // this.doEntitySearch()
    }
  }

  onClear() {
    if (!this.blockRequests) {
      this.blockRequests = true
      // this.doEntitySearch()
    }
  }

  clearFilter(filterType) {
    switch (filterType) {
      case 'class':
        this.classFilter = null
        break;
      case 'relation':
        this.relationFilter = null
        break;
      default:
        break;
    }
    // this.searchEntities()
  }

  constructQuery(event = null) {
    var query = ''
    query = (this.classFilter && this.classFilter != '') ? `${query}${query.length > 0 ? '+' : ''}entityTypeLike:\"${this.classFilter}\"` : query;
    query = (this.relationFilter && this.relationFilter != '') ? `${query}${query.length > 0 ? '+' : ''}propertyName:\"${this.relationFilter}\"` : query;
    query = (this.valueFilter && this.valueFilter != '') ? `${query}${query.length > 0 ? '+' : ''}propertyValue:\"${this.valueFilter}\"` : query;
    return query
  }

  openEntityDetail(semanticEntity) {
    if (!semanticEntity.fullEntity) {
      this.semanticModelService.getEntity(semanticEntity.entityId, false).subscribe(response => {
        semanticEntity.fullEntity = JSON.stringify(response)
        this.parent.referenceDetailModal.open({ semanticContribution: { slug: SemanticUtils.extractTranscriptorUrlPrefix(semanticEntity["entityId"]), schema_type: semanticEntity["entityType"], text: semanticEntity.fullEntity } }, null, false)
      });
    } else {
      this.parent.referenceDetailModal.open({ semanticContribution: { text: semanticEntity.fullEntity } })
    }
  }

  setEntityPrefixes(commaSeparatedEntities) {
    return commaSeparatedEntities.split(',').map(entity => this.ontologyPipe.transform(entity)).join(', ')
  }

}