import { Component, OnInit,Input,Output,EventEmitter,ChangeDetectorRef, SimpleChanges } from '@angular/core';

import { PublicationService } from '../../../services/forum/publication.service';
import { SimpleGlobal } from 'ng2-simple-global';


@Component({
  selector: 'app-publication-container',
  templateUrl: './publication-container.component.html',
  styleUrls: ['./publication-container.component.scss']
})
export class PublicationContainerComponent implements OnInit {



  @Input() publication;
  @Input() publications;
  @Input() forum;
  publicationsChilds = [];
  showResponses:boolean = false;

  publicationNew = {text:"",foro: null,parent: null};
  deleteAction: boolean = false;

  @Output() publicationEvent = new EventEmitter();
  @Output() publicationEventParent = new EventEmitter();

  replyBoxFocused:boolean = false;

  constructor(private publicationService:PublicationService,
    private changeDetector: ChangeDetectorRef,
    public global: SimpleGlobal) { }

  ngOnInit() {
    this.loadPublications();
  }

  getAvatarUrl(username) {
    return 'https://ui-avatars.com/api/?name='+ username + '&background=f61&color=fff&rounded=true';
  }

  deleteComment(publicationP) {
  //  this.publication=publicationP;
    this.publicationService.delete(publicationP.id)
      .subscribe(publication => {
          //borrar publication
          this.deleteAction=true;
          if(publicationP.parent_id==null){
            this.publicationEvent.emit({publication:this.publication,deleteAction:this.deleteAction});
          }else{
            for (let publicationF of this.publicationsChilds) {
                if(publication.id == publicationF.id ){

                  var index = this.publicationsChilds.indexOf(publicationF);
                  this.publicationsChilds.splice(index,1);
                }
            }
          //  this.publicationEventParent.emit({publication:this.publication,deleteAction:this.deleteAction});
          }
          this.changeDetector.detectChanges();
      });
  }

  deletePublicationChild(event):void{
      if(event.deleteAction){
        for (let publication of this.publicationsChilds) {
            if(publication.id == event.publication.id ){
              this.publicationsChilds.splice(publication,1);
            }
        }
      }else{
          this.publicationsChilds.push( event.publication);
      }
  }


  addComment() {
    this.deleteAction=false;
    this.publicationNew.foro=this.forum;
    this.publicationNew.parent=this.publication;
    this.publicationService.create(this.publicationNew)
      .subscribe(publication => {
        this.publicationNew={text:"",foro:this.forum,parent:this.publication};
        if(publication.parent_id==null){
            this.publicationEventParent.emit({publication:this.publication,deleteAction:this.deleteAction});
          }else{
            this.publicationsChilds.push(publication);
          }
      this.changeDetector.detectChanges();
    });
  }
  loadPublications() {
    this.publicationService.listChild(this.publication.id, {})
      .subscribe(publications => {
        this.publicationsChilds = publications;
        this.changeDetector.detectChanges();
      });
  }


  like(publication) {
    this.publicationService.like(publication.id, {})
      .subscribe(publications => {
        publication.voted=true;
        publication.cached_weighted_score++;
        this.changeDetector.detectChanges();
      });

  }
  dislike(publication) {
    this.publicationService.dislike(publication.id, {})
      .subscribe(publications => {
        publication.voted=false;
        publication.cached_weighted_score--;
        this.changeDetector.detectChanges();
      });
  }

}
