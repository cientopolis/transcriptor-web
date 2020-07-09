import { OntologyService } from './../../../../services/ontology/ontology.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ontology } from 'app/models/ontology/ontology';

@Component({
  selector: 'app-ontologies',
  templateUrl: './ontologies.component.html',
  styleUrls: ['./ontologies.component.scss']
})
export class OntologiesComponent implements OnInit {
  loader=true;
  ontologies : Array<Ontology>;
  searchOntologyText:string;
  ontology:Ontology;

  @Output() public ontologySelected = new EventEmitter<Ontology>(); 

  constructor(private ontologyService: OntologyService) { }

  ngOnInit() {
    this.getOntologies();
  }
  getOntologies(){
    this.ontologies = new Array<Ontology>();
    this.ontologyService.list({}).subscribe(response => {
      console.log(response);
      if (response) {
        response.forEach(ontology => {
          let on = new Ontology(ontology);
          this.ontologies.push(on);
        });
      }
      this.loader = false;
      console.log(this.ontologies);
    })

  }

  selectOntology(ontology) {
    this.ontology = ontology;
  }
  confirmOntology(){
    this.searchOntologyText = '';
    this.ontologySelected.emit(this.ontology);
  }

}
