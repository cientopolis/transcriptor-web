import { OntologyService } from './../../services/ontology/ontology.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Ontology } from 'app/models/scheme/ontology';


@Component({
  selector: 'ontology',
  templateUrl: './ontology.component.html',
  styleUrls: ['./ontology.component.scss']
})
export class OntologyComponent implements OnInit {
  ontologies:Array<Ontology>;
  ontology = new Ontology();
  @ViewChild('modalNewOntology') modalAddOntology;
  updateMode = false;
  constructor(private ontologyService:OntologyService) { }

  ngOnInit() {
    this.listOntologies();
  }

  createOntology() {
    console.log('save');
    this.ontologyService.create(this.ontology)
      .subscribe(collection => {
        this.ontology = new Ontology;
        this.listOntologies();
      });
  }
  openModalOntology() {
    this.updateMode=false;
    this.ontology= new Ontology();
    this.modalAddOntology.openModal();
  }
  openModalUpdateOntology(ontology) {
    this.updateMode = true;
    this.ontology = ontology;
    this.modalAddOntology.openModal();
  }
  confirmDelete(){
    this.ontologyService.delete(this.ontology)
      .subscribe(ontology => {
        this.ontology = new Ontology;
        this.listOntologies();
      });
  }

  updateOntology() {
    this.ontologyService.edit(this.ontology)
      .subscribe(ontology => {
        this.ontology = new Ontology;
        this.listOntologies();
      });
  }


  listOntologies(){
    this.ontologies = new Array <Ontology>();
    this.ontologyService.list({}).subscribe(response=>{
      console.log(response);
      if(response){
        response.forEach(ontology => {
          let on = new Ontology(ontology);
          this.ontologies.push(on);
        });
      }
      console.log(this.ontologies);
    })
  }

}
