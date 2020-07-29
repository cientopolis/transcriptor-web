import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { SemanticModelService } from 'app/services/semantic-model/semantic-model.service';
import { OntologyPipe } from 'app/pipes/ontology.pipe';
import { SearchService } from 'app/services/search/search.service';

@Component({
  selector: 'app-ontology-search-input',
  templateUrl: './ontology-search-input.component.html',
  styleUrls: ['./ontology-search-input.component.scss']
})
export class OntologySearchInputComponent implements OnInit {

  @ViewChild('searchInput') searchInput;

  @Input() autocomplete = true
  @Input() ontologyComponent = null
  @Input() results = null
  @Input() limitResults = null
  @Input() fetchSelectedEntity = true
  @Input() placeholder = ""
  @Input() flatStyle = false
  @Input() searchIcon = 'magnify'
  @Input() textChange = function(event) {}
  
  @Input() componentType = "class"
  @Output() ontologyComponentChange = new EventEmitter()
  @Output() resultsChange = new EventEmitter()
  @Output() onFetchStart = new EventEmitter()
  @Output() onFetchEnd = new EventEmitter()
  @Output('onClear') onClearPressed = new EventEmitter()

  showAllTypes = true

  constructor(
    private searchService: SearchService, 
    private semanticModelService: SemanticModelService,
    private ontologyPipe: OntologyPipe) {
    this.limitResults = (this.limitResults == null && this.autocomplete) ? 5 : this.limitResults
  }

  ngOnInit() {
  }

  searchComponents($event) {
    this.setOntologyComponent($event.searchText) 
    this.onFetchStart.emit()
    this.searchService.listLoadedEntities({
      semantic_component: this.componentType,
      searchText: $event.searchText
    }).subscribe(response => {
      this.onFetchEnd.emit()
      var mappedEntities = []
      response.forEach(component => {
        mappedEntities.push({ title: this.ontologyPipe.transform(component.component), description: component.component, item: component.component })
      });
      this.results = mappedEntities
      this.resultsChange.emit(this.results)
      this.searchInput.setResults(this.results)
    });
  }

  itemChange(item) {
    if (this.fetchSelectedEntity) {
      this.semanticModelService.getEntity(item.component.value, false).subscribe(response => {
        this.setOntologyComponent(response)
      });
    } else {
      this.setOntologyComponent(item)
    }
  }

  setOntologyComponent(ontologyComponent) {
    this.ontologyComponent = ontologyComponent
    this.ontologyComponentChange.emit(this.ontologyComponent)
  }

  filter() {
    this.refresh()
  }

  refresh() {
    this.searchInput.search()
  }

  onClear() {
    this.results = null
    this.resultsChange.emit(this.results)
    this.searchInput.setResults(this.results)
    this.onClearPressed.emit()
  }

  handleInvalidInput() {
    this.results = []
    this.resultsChange.emit(this.results)
    this.searchInput.setResults(this.results)
  }

}