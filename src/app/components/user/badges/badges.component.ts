import { Component, OnInit } from '@angular/core';

import { BadgeService } from '../../../services/badge/badge.service';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss']
})
export class BadgesComponent implements OnInit {

  badges:any[] = [];

  constructor(private badgeService:BadgeService) {
    this.badges = badgeService.list().subscribe(badges => this.badges=badges);
  }

  ngOnInit() {
  }

}
