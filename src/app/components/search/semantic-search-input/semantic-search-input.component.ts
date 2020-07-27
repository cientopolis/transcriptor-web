import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { SemanticModelService } from 'app/services/semantic-model/semantic-model.service';
import { OntologyPipe } from 'app/pipes/ontology.pipe';

@Component({
  selector: 'app-semantic-search-input',
  templateUrl: './semantic-search-input.component.html',
  styleUrls: ['./semantic-search-input.component.scss']
})
export class SemanticSearchInputComponent implements OnInit {

  @ViewChild('searchInput') searchInput;
  @ViewChild('modalTypeFilter') modalTypeFilter;
  
  @Input() autocomplete = true
  @Input() semanticModel = null
  @Input() results = null
  @Input() limitResults = null
  @Input() entityType = null
  @Input() hierarchical = true
  @Input() fetchSelectedEntity = true
  @Input() placeholder = ""
  @Input() flatStyle = false
  @Input() typeSelector = false

  @Output() semanticModelChange = new EventEmitter()
  @Output() resultsChange = new EventEmitter()
  @Output() onFetchStart = new EventEmitter()
  @Output() onFetchEnd = new EventEmitter()
  @Output('onClear') onClearPressed = new EventEmitter()

  showAllTypes = true
  filterType = null
  showedType = null

  constructor(private semanticModelService: SemanticModelService, private schemePipe: OntologyPipe) {
    this.limitResults = (this.limitResults == null && this.autocomplete) ? 5 : this.limitResults
  }

  ngOnInit() {
  }
  
  searchEntities($event) {
    this.onFetchStart.emit()
    this.semanticModelService.listEntities({ 
      filter: {
        labelValue: $event.searchText,
        entityType: this.entityType,
        hierarchical: this.hierarchical,
        limit: this.limitResults
      } 
    }).subscribe(response => {
      this.onFetchEnd.emit()
      var mappedEntities = []
      response.forEach(entity => {
        mappedEntities.push({ title: entity.entityLabel, description: this.schemePipe.transform(entity.entityType), item: entity })
      });
      this.results = mappedEntities
      this.resultsChange.emit(this.results)
      this.searchInput.setResults(this.results)
    });
  }

  itemChange(item) {
    if (this.fetchSelectedEntity) {
      this.semanticModelService.getEntity(item.entityId.value, false).subscribe(response => {
        this.setSemanticModel(response)
      });
    } else {
      this.setSemanticModel(item)
    }
  }

  setSemanticModel(semanticModel) {
    this.semanticModel = semanticModel
    this.semanticModelChange.emit(this.semanticModel)
  }

  openTypeFilter() {
    this.showAllTypes = this.entityType == null
    this.modalTypeFilter.openModal()
  }

  selectType(type) {
    this.filterType = type
  }

  filter() {
/*     this.entityType = this.showAllTypes ? null : `schema:${this.filterType.split('>').slice(-1)[0]}`;
    this.showedType = this.showAllTypes ? null : this.filterType.split('>').slice(-1)[0] */
    this.entityType = this.showAllTypes ? null : this.filterType.name;
    this.showedType = this.showAllTypes ? null : this.filterType.name
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
