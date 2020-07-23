import { SimpleGlobal } from 'ng2-simple-global';
import { OntologyService } from './../../../../services/ontology/ontology.service';
import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { Ontology } from 'app/models/ontology/ontology';

@Component({
  selector: 'app-ontologies',
  templateUrl: './ontologies.component.html',
  styleUrls: ['./ontologies.component.scss']
})
export class OntologiesComponent implements OnInit, AfterViewInit{
  loader=true;
  ontologies : Array<Ontology>;
  searchOntologyText:string;
  ontology:Ontology;
  @Input() showStepper = false;
  @Output() public ontologySelected = new EventEmitter<Ontology>(); 

  constructor(private ontologyService: OntologyService, public global: SimpleGlobal) { }

  ngAfterViewInit() {
    // this.handlePropertieValidation(false);
    // this.hideButtonStep();
    //this.disableButton();

  }

  disableButton(){
    let a = $('#select-ontology-step .btn-floating');
    a.prop('disabled', true);
    a.addClass('disabled');
    //a.parent().css({ pointerEvents: "auto" });
  }

  enableButton() {
    let a = $('#select-ontology-step .btn-floating');
    $('#select-ontology-step .btn-floating').removeClass('disabled')
    a.prop('disabled', false);

  }
  ngOnInit() {
    this.getOntologies();
  }
  getOntologies(){
    this.ontologies = new Array<Ontology>();
    this.ontologyService.list({}).subscribe(response => {
      if (response) {
        this.global['ontologies'] = response;
        response.forEach(ontology => {
          let on = new Ontology(ontology);
          this.ontologies.push(on);
        });
      }
      this.loader = false;
    })

  }

  selectOntology(ontology) {
    this.ontology = ontology;
    this.enableButton();
  }
  confirmOntology(){
    let a = $('#select-ontology-step .btn-floating');
    a.prop('disabled', false);
    a.parent().css({ pointerEvents: "auto", display: "none" });
    a.removeClass('disabled');

    this.searchOntologyText = '';
    this.ontologySelected.emit(this.ontology);
  }

}
