import { OntologyClass } from '../../../../../../models/ontology/class/ontologyClass';
import { Ontology } from '../../../../../../models/ontology/ontology';
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
  types: Array<OntologyClass>;
  typeSelected: OntologyClass;
  @Input() public showStepper = false;
  @Input() ontology:Ontology;
  @Input() notifyNextStep = false;
  @Input() eagerSelection = true;
  @Output() public ontologySelected = new EventEmitter<any>();
  @Output() public ontologyTypeSelected = new EventEmitter<OntologyClass>();
  constructor(
    private semanticService: SemanticModelService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if(this.ontology!=null){
      this.getTypes();
    }else{
      this.ontology = null;
      this.loader = false;
      this.returnOntology(null); 
    }  
  }

  getOntologyClassDetail() {
    console.log('Get specific class');
    this.loader = true;
    let params = { parent: this.typeSelected.name, ontology_id: this.ontology.id }
    this.semanticService.getTypesTreejson(params).subscribe(response => {
      this.setChildrens(response);
      this.loader = false;
      this.changeDetector.detectChanges();
    }); 
  }
  setChildrens(response){
    let childs = new Array<OntologyClass>();
    if (response && response.length > 0) {
      response.forEach(child => {
        childs.push(new OntologyClass(child, this.ontology));
      });
    }
    this.types = childs;
  }

  selectOntologyClass(ontologyClass) {
    this.searchText = '';
    this.typeSelected=ontologyClass;
    this.parents.push(this.typeSelected);
    if (this.eagerSelection) {
      this.selectClass();
    }
    this.getOntologyClassDetail();

  }

  isHierarchycal(response){
    if(response && response.length==1){
      return true;
    }
    return false;
  }
  getTypes(){
    this.loader=true;
    let params = { parent: this.typeSelected,ontology_id:this.ontology.id}
    this.semanticService.getTypesTreejson(params).subscribe(response => {
      if(this.isHierarchycal(response)){
        let typeSelected = new OntologyClass(response[0], this.ontology);
        this.selectOntologyClass(typeSelected);
      }else{
        let parent = new OntologyClass();
        parent.label=this.ontology.name;
        this.parents.push(parent);
        this.setChildrens(response);
      }
      this.loader = false;
      this.changeDetector.detectChanges();
    }); 
  }


  filter(event){
    this.schemasShow = this.types.filter(schema => schema.label.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  ngOnChanges(changes) {
    if (changes.notifyNextStep && changes.notifyNextStep.currentValue) {
      this.selectClass();
    }
  }

  selectOntology(event) {
    this.ontology = event;
    this.getTypes(); 
    this.returnOntology(this.ontology); 
  }
  returnOntology(ontology){
    this.ontologySelected.emit(this.ontology);
  }

  setParent(parent) {
      let index = this.parents.indexOf(parent);
      if (index < this.parents.length) {
        index++;
      }
      this.parents.splice(index-1);
      this.selectOntologyClass(parent);
  }


  selectClass() {
    if(this.typeSelected.id!=null){
      this.ontologyTypeSelected.emit(this.typeSelected);
    }
  }

}
