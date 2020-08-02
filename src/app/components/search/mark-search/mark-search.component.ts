import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SearchService } from 'app/services/search/search.service';
import { filter } from 'lodash';
import { SearchComponent } from '../search.component';

@Component({
  selector: 'app-mark-search',
  templateUrl: './mark-search.component.html',
  styleUrls: ['./mark-search.component.scss']
})
export class MarkSearchComponent implements OnInit {

  @ViewChild('searchInput') searchInput;
  referencesGroups: any = []
  blockRequests = true
  advancedSearch = false

  classFilter=null
  relationFilter=null
  valueFilter=null

  @Input('parent') parent: SearchComponent

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.doMarkSearch()
  }

  searchMarks($event = null) {
    this.blockRequests = false
    var filter = {
      // searchQuery: $event.searchText
      searchQuery: $event && $event.searchText ? $event.searchText : this.constructQuery()
    }
    this.doMarkSearch(filter)
    
    // this.onFetchStart.emit()
    // labelValue: $event.searchText,
    // entityType: this.entityType,
    // hierarchical: this.hierarchical,
    // limit: this.limitResults
  }
      
  doMarkSearch(filter = {}) {
    this.searchService.listMarks(filter).subscribe(response => {
      // this.onFetchEnd.emit()
      this.referencesGroups = response
      // this.resultsChange.emit(this.results)
      // this.searchInput.setResults(this.results)
    });    
  }

  handleInvalidInput(){
    if(!this.blockRequests) {
      this.blockRequests = true
      this.doMarkSearch()
    }
  }

  onClear() {
    if (!this.blockRequests) {
      this.blockRequests = true
      this.doMarkSearch()
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
    this.searchMarks()
  }

  constructQuery(event = null) {
    var query = ''
    query = (this.classFilter && this.classFilter != '') ? `${query}${query.length > 0 ? '+' : ''}entityTypeLike:\"${this.classFilter}\"` : query;
    query = (this.relationFilter && this.relationFilter != '') ? `${query}${query.length > 0 ? '+' : ''}propertyName:\"${this.relationFilter}\"` : query;
    query = (this.valueFilter && this.valueFilter != '') ? `${query}${query.length > 0 ? '+' : ''}propertyValue:\"${this.valueFilter}\"` : query;
    return query
  }
}
