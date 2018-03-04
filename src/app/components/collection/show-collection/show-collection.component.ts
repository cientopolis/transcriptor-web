import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CollectionService } from '../../../services/collection/collection.service';

@Component({
  selector: 'app-show-collection',
  templateUrl: './show-collection.component.html',
  styleUrls: ['./show-collection.component.scss']
})
export class ShowCollectionComponent implements OnInit {
  
  collection = null;

  constructor(private collectionService: CollectionService, private route: ActivatedRoute) { }

  ngOnInit() {
    const collectionId = +this.route.snapshot.paramMap.get('collectionId');
    this.collectionService.get(collectionId, { fields: ['owner']})
      .subscribe(collection => this.collection=collection);
  }
  
  onShow() {
    $('.tabs-content.carousel').height($('.carousel-item.active .row').height());
  }

}