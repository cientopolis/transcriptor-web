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
  @Output() close = new EventEmitter();
  replyBoxFocused:boolean = false;

  constructor(private publicationService:PublicationService, public global: SimpleGlobal,private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    $('.publications-modal').modal()
  }
  open() {
    $('.publications-modal').modal('open')
    this.loadPublications();
  }

  closeModal() {
    $('.publications-modal').modal('close')
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
    this.publicationService.list(this.forum.id, {})
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
          this.scrollToLastPublication()
    });
  }

  getAvatarUrl(username) {
    return 'https://ui-avatars.com/api/?name='+ username + '&background=f61&color=fff&rounded=true';
  }

  textAreaScrollDown() {
    $('.publications-modal .modal').animate({ scrollTop: $('.publications-modal .modal').height() }, 1000);
  }

  scrollToLastPublication() {
    $('.publications-modal .modal-content').animate({
      scrollTop: $('.publication:last .row').offset().top
    }, 1500)
    $('.publication:last .row').addClass('mark-publication-color')
  }
}
