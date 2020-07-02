import { OntologyType } from './../../../../../../models/scheme/type';

import { Ontology } from '../../../../../../models/scheme/ontology';
import { SemanticModelService } from '../../../../../../services/semantic-model/semantic-model.service';
import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'select-ontology-type',
  templateUrl: './select-ontology-type.component.html',
  styleUrls: ['./select-ontology-type.component.scss']
})
export class SelectOntologyTypeComponent implements OnInit {
  loader: Boolean = true;
  parents = new Array<any>();
  searchText: any;
  schemasShow= new Array<any>();
  types: Array<OntologyType>;
  typeSelected:OntologyType;
  @Input() ontology:Ontology;
  @Input() notifyNextStep = false;
  @Input() eagerSelection = true;
  @Input() mark: any;
  @Output() public ontologyTypeSelected = new EventEmitter<any>();
  constructor(
    private semanticService: SemanticModelService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if(this.ontology!=null){
      console.log(this.ontology);
      this.getAllEntities();
    }else{
      console.log('debe tener una ontologia cargada');
      // temporalmente: 
      this.ontology = new Ontology({ 'name': 'schema', 'description': 'Esquema ontology' });
      //
      console.log(this.ontology);
      this.getAllEntities();
      //this.getTypes();
    }  
  }

  getTypes(){
   /*  this.semanticService.getTypesTreejson().subscribe(response => {
      console.log(response);
    }); */
    this.semanticService.getAllTypes(this.ontology).then(result => {
      this.typeSelected = result;
      if (this.eagerSelection) {
        this.selectSchema();
      }
      this.loader = false;
      this.changeDetector.detectChanges();
    });
  }
  getAllEntities(){
    this.semanticService.getAllTypes(this.ontology).then(result => {
      this.typeSelected = result;
      this.parents.push(result);
      this.types = result.children;
      if (this.eagerSelection) {
        this.selectSchema();
      }
      this.loader = false;
      this.changeDetector.detectChanges();
    });
  }

  filter(event){
    this.schemasShow = this.types.filter(schema => schema.name.toLowerCase().includes(this.searchText.toLowerCase()));
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
    this.typeSelected = parent;
    this.parents.splice(index);
    this.types = this.typeSelected.children;
    if (this.eagerSelection) {
      this.selectSchema();
    }
  }

  selectType(type) {
    this.parents.push(type);
    this.types = type.children;
    this.typeSelected = type;
    this.searchText='';
    if (this.eagerSelection) {
      this.selectSchema();
    }
  }
  selectSchema() {
    console.log(this.typeSelected);
    this.ontologyTypeSelected.emit(this.typeSelected.name);
  }

}
