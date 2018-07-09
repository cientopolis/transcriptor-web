import { Component, OnInit,Input,Output,ViewChild,EventEmitter,ChangeDetectorRef } from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';

import { PublicationService } from '../../../services/forum/publication.service';


@Component({
  selector: 'app-publications-list',
  templateUrl: './publications-list.component.html',
  styleUrls: ['./publications-list.component.scss']
})
export class PublicationsListComponent implements OnInit {

  @Input() forum;
  @Input() element;
  text="";
  publication = {text:"",foro:null};
  publications = [];
  publicationsResult: boolean = false;
  @Input() modalOptions: Materialize.ModalOptions = {};
  @ViewChild('modal') modal;
  @Output() close = new EventEmitter();

  constructor(private publicationService:PublicationService, private global: SimpleGlobal,private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {

  }
  open() {
    this.modal.open();
    this.loadPublications();
  }

  closeModal() {
    this.close.emit();
  }

  showPublication(event):void{
      if(event.deleteAction){
        for (let publication of this.publications) {
            if(publication.id ==event.publication.id ){
                 this.publications.splice(publication,1);
                 this.changeDetector.detectChanges();
            }
        }
      }else{
        this.publications.push(event.publication);
        this.changeDetector.detectChanges();
      }
    }

  loadPublications() {
    this.text=this.forum.element.text;
    this.publicationService.list(this.forum.id, { fields: ['user']})
      .subscribe(publications => {
        this.publications = publications;
        this.publicationsResult=true;
        this.changeDetector.detectChanges();
      });
  }

  addComment() {
    this.publication.foro=this.forum;
    this.publicationService.create(this.publication)
      .subscribe(publication => {
          this.publications.push(publication);
          this.publication={text:"",foro:this.forum};
          this.changeDetector.detectChanges();
    });
  }
  
  getAvatarUrl(username) {
    return 'https://ui-avatars.com/api/?name='+ username + '&background=f61&color=fff&rounded=true';
  }
}
