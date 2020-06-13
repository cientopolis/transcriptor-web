import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { SemanticModelService } from 'app/services/semantic-model/semantic-model.service';
import { SchemePipe } from 'app/pipes/scheme.pipe';

@Component({
  selector: 'app-semantic-search-input',
  templateUrl: './semantic-search-input.component.html',
  styleUrls: ['./semantic-search-input.component.scss']
})
export class SemanticSearchInputComponent implements OnInit {

  @ViewChild('searchInput') searchInput;
  
  @Input() autocomplete = true
  @Input() semanticModel = null
  @Input() results = null
  @Input() limitResults = null
  @Input() entityType = null
  @Input() fetchSelectedEntity = true
  @Input() placeholder = ""
  @Input() flatStyle = false

  @Output() semanticModelChange = new EventEmitter()
  @Output() resultsChange = new EventEmitter();
  public typeSelector = false;

  constructor(private semanticModelService: SemanticModelService, private schemePipe: SchemePipe) {
    this.limitResults = (this.limitResults == null && this.autocomplete) ? 5 : this.limitResults
  }

  ngOnInit() {
  }
  
  searchEntities($event) {
    this.semanticModelService.listEntities({ 
      filter: {
        labelValue: $event.searchText,
        entityType: this.entityType,
        limit: this.limitResults
      } 
    }).subscribe(response => {
      var mappedEntities = []
      response.bindings.forEach(entity => {
        mappedEntities.push({ title: entity.entityLabel.value, description: this.schemePipe.transform(entity.entityType.value), item: entity })
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
}
