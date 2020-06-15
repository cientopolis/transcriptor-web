import { HeaderService } from './../../../../../services/sharedData/header.service';
import { SemanticModelService } from './../../../../../services/semantic-model/semantic-model.service';
import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-select-schema',
  templateUrl: './select-schema.component.html',
  styleUrls: ['./select-schema.component.scss']
})
export class SelectSchemaComponent implements OnInit {
  loader: Boolean = true;
  parents = new Array<any>();
  schemas: Array<any>;
  scheme: any;
  searchText: any;
  schemasShow= new Array<any>();
  @Input() notifyNextStep = false;
  @Input() eagerSelection = true;
  @Input() mark: any;
  @Output() public schemeSelected = new EventEmitter<any>();
  constructor(
    private semanticService: SemanticModelService,
    private changeDetector: ChangeDetectorRef,
    private headerService: HeaderService
    ) { }

  ngOnInit() {
    this.getAllEntities();
  }
  getAllEntities(){
    this.semanticService.getAllTypes().then(result => {
      this.scheme = result;
      this.parents.push(result);
      this.schemas = result.children;
      if (this.eagerSelection) {
        this.selectSchema();
      }
      this.loader = false;
      this.changeDetector.detectChanges();
    });
  }

  filter(event){
    this.schemasShow = this.schemas.filter(schema => schema.name.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  ngOnChanges(changes) {
    if (changes.notifyNextStep && changes.notifyNextStep.currentValue) {
      this.selectSchema();
    }
  }

  setParent(parent) {
    let index = this.parents.indexOf(parent);
    if (index < this.parents.length) {
      index++;
    }
    this.scheme = parent;
    this.parents.splice(index);
    this.schemas = this.scheme.children;
    if (this.eagerSelection) {
      this.selectSchema();
    }
  }

  selectType(schema) {
    this.parents.push(schema);
    this.schemas = schema.children;
    this.scheme=schema;
    this.searchText='';
    if (this.eagerSelection) {
      this.selectSchema();
    }
  }
  selectSchema() {
    this.schemeSelected.emit(this.scheme.name);
  }

}
