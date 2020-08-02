import { OntologyService } from './../../services/ontology/ontology.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Ontology } from 'app/models/ontology/ontology';
import { FlashMessagesService } from 'app/services/util/flash-messages/flash-messages.service';
import { DataType } from 'app/models/ontology/datatype';


@Component({
  selector: 'ontology',
  templateUrl: './ontology.component.html',
  styleUrls: ['./ontology.component.scss']
})
export class OntologyComponent implements OnInit {
  ontologies:Array<Ontology> = [];
  ontology = new Ontology();
  @ViewChild('modalNewOntology') modalAddOntology;
  @ViewChild('fileInput') fileInput;
  updateMode = false;
  internalTypes = [
    'text',
    'number',
    'date',
    'datetime',
    'boolean'
  ]
  searchOntologyText:String

  constructor(
    private ontologyService:OntologyService,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.listOntologies();
  }

  createOntology() {
    console.log('save');
    this.ontologyService.create(this.ontology)
      .subscribe(ontology => {
        this.ontology = ontology
        if (this.isFileLoaded()) {
          this.upload()
        } else {
          this.reset()
        }
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
        if (this.isFileLoaded()) {
          this.upload()
        } else {
          this.reset()
        }
      });
  }


  listOntologies(){
    this.ontologyService.listOntologies({}).subscribe(ontologies=>{
      this.ontologies = ontologies;
    })
  }

  upload() {
    const files: FileList = this.fileInput.nativeElement.files;
    if (files.length === 0 || isNaN(this.ontology.id) || this.ontology.id === null) {
      this.flashMessagesService.addI18n('upload.validationMessages.noFileSelected');
      return;
    };

    const formData = new FormData();
    formData.append('utf', '✓');
    formData.append('ontology[graph_file]', files[0]);
    formData.append('ontology_id', this.ontology.id + '');

    this.ontologyService.uploadGraph(this.ontology, formData).subscribe(ontology => {
      this.reset()
    });
  }

  reset() {
    this.ontology = new Ontology;
    this.listOntologies();
    $('#ontology_graph_file').val('');
    $('.file-path-wrapper input').val('');
  }

  isFileLoaded() {
    const files: FileList = this.fileInput.nativeElement.files;
    return !(files.length === 0 || isNaN(this.ontology.id) || this.ontology.id === null)
  }

  addDataType() {
    this.ontology.ontology_datatypes_attributes.push(new DataType())
  }
}
