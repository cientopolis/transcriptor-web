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
  autocomplete =true;
  parents = new Array<Array<OntologyClass>>();
  schemasShow= new Array<any>();
  types: Array<OntologyClass>;
  temporalTypes: Array<OntologyClass>;
  typeSelected: OntologyClass;
  showParents = true;
  showButtonResetSearch=false;
  lastsearch =''
  ishierarchichal = false;
  @Input() public showStepper = false;
  @Input() ontology:Ontology;
  @Input() notifyNextStep = false;
  @Input() eagerSelection = true;
  @Output() public ontologySelected = new EventEmitter<any>();
  @Output() public ontologyTypeSelected = new EventEmitter<OntologyClass>();

  results =[];

  constructor(
    private semanticService: SemanticModelService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if(this.ontology!=null){
      this.initParents();
      this.getTypes();
    }else{
      this.ontology = null;
      this.loader = false;
      this.returnOntology(null); 
    }  
  }
  setSingleParentsArray(parents = null){
    let singleArray = Array<OntologyClass>()
    if(!parents){
      singleArray.push(this.setnonHierarchichalParent());
    }else{
      for (var i = 0; i < parents.length; i++) {
        singleArray.push(new OntologyClass(parents[i], this.ontology));
      }
    }
    return singleArray;
  }

  initParents(){
    this.parents = new Array<Array<OntologyClass>>();
    this.parents.push(new Array<OntologyClass>());
  }

  setParentsFromRequest(parents){
    if (this.parents.length == 0) {
      this.initParents();
    }
    let parentsreturn = new Array<Array<OntologyClass>>();
    for (var i = 0; i < parents.length; i++) {
      parentsreturn.push(this.setSingleParentsArray(parents[i]));
    }
    if(!this.ishierarchichal){
      let parent = new OntologyClass();
      parent.label = this.ontology.name;
      parentsreturn.forEach(parentitem => {
        parentitem.unshift(parent);
      })
    }
    return parentsreturn;
  }

  getOntologyClassDetail() {
    this.loader = true;
    let params = { parent: this.typeSelected.name, ontology_id: this.ontology.id }
    this.semanticService.getTypesTreejson(params).subscribe(response => {
      if (response.parents.length == 0) {
        this.initParents();
        if (!this.ishierarchichal) {
          let parent = new OntologyClass();
          parent.label = this.ontology.name;
          this.parents.forEach(parentitem => {
            parentitem.unshift(parent);
          })
        }
      }else{
        this.parents=this.setParentsFromRequest(response.parents);
      }

      if (this.typeSelected.label!=this.ontology.name){
        this.parents.forEach(parent=>{
          parent.push(this.typeSelected)
        })
      }
      this.setChildrens(response.childs);
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
    if (!this.showParents) {
      this.showParents = true;
      this.temporalTypes = [];
      this.showButtonResetSearch=true;
    }
    this.typeSelected=ontologyClass;
/*     this.parents.forEach(parent=>{
      parent.push(this.typeSelected);
    }) */
    if (this.eagerSelection) {
      this.selectClass();
    }
    this.getOntologyClassDetail();

  }

  isHierarchycal(response){
    if(response && response.length==1){
      this.ishierarchichal=true;
      return true;
    }else{
      this.ishierarchichal=false;
    }
    return false;
  }

 setnonHierarchichalParent(){
   if(this.parents.length==0){
     this.initParents();
   }
   let parent = new OntologyClass();
   parent.label = this.ontology.name;
   this.parents.forEach(parentitem=>{
     parentitem.unshift(parent);
   })
   return parent;
  }

  getTypes(){
    this.loader=true;
    this.showButtonResetSearch=false;
    let params = { parent: this.typeSelected,ontology_id:this.ontology.id}
    this.semanticService.getTypesTreejson(params).subscribe(response => {
      if (this.isHierarchycal(response.childs)){
        let typeSelected = new OntologyClass(response.childs[0], this.ontology);
        this.selectOntologyClass(typeSelected);
      }else{
        this.setnonHierarchichalParent();
        this.setChildrens(response.childs);
      }
      this.loader = false;
      this.changeDetector.detectChanges();
    }); 
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
      this.selectOntologyClass(parent);
  }


  selectClass() {
    if(this.typeSelected.id!=null){
      this.ontologyTypeSelected.emit(this.typeSelected);
    }
  }

  itemChange(event){
    console.log('item change');
  }


  onClear(){
    console.log('On Clear');
    if (this.temporalTypes && this.temporalTypes.length > 0 && !this.showParents) {
      this.results = null
      this.showParents=true;
      this.types = this.temporalTypes;
    }
  }
  handleInvalidInput(){
    console.log('handle invalid input');
    this.results = [];
    this.onClear();
    this.temporalTypes=[]
  }


  refresh() {
    console.log('refresh');
  }

  processresul(response){
    let ontologiesclases = new Array<any>();
    if (response && response.length > 0) {
      response.forEach(clazz => {
        ontologiesclases.push(new OntologyClass(clazz, this.ontology));
      });
    }
   return ontologiesclases;
  }

  searchEntities($event) {
    console.log('searchEntities');
    this.semanticService.searchEntityByClass(this.ontology.id, $event.searchText).subscribe(response => {
        if(response==null){
          response=[];
        }
        if ((response.length == 0 && this.getTypes.length == 0) || this.lastsearch == $event.searchText){
        }else{
          this.temporalTypes = this.types;
          this.showParents=false;
          this.setChildrens(response);
          this.lastsearch = $event.searchText;
        }
    });
  }
}
