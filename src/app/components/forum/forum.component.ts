import { Component, OnInit,Input } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {SimpleGlobal} from 'ng2-simple-global';

import { ForumService } from '../../services/forum/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})

export class ForumComponent implements OnInit {

  @Input() element;
  forum = {};
  newForum = {element:{id: null,className:null}};

  constructor(private forumService: ForumService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
           let userId = params[':transcriptionId'];
           console.log(userId);
         });
  }


  private handleResponse(forum) {
    this.forum=forum;
    console.log(this.forum);
  }

  get(id) {
    console.log("lalalala");
    this.forumService.get(18,{})
        .subscribe(response => this.handleResponse(response));

  }


  createForum() {
    this.forumService.create(this.forum)
      .subscribe(forum => {
        this.forum={};

      });
  }

}
