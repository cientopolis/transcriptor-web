import { Component, OnInit } from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';
import { UserService } from '../../../services/user/user.service';
import { VisitorRangeStrategy } from './range-strategies/visitor-range-strategy';
import { ExplorerRangeStrategy } from './range-strategies/explorer-range-strategy';
import { PlayerInfo } from 'app/models/playerInfo';
import { CitizenScientistRangeStrategy } from './range-strategies/citizenScientist-range-strategy';
import { CommitedCitizenScientistRangeStrategy } from './range-strategies/commitedCitizenScientist-range-strategy';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent implements OnInit {

  showInfo = false
  playerInfo: PlayerInfo
  rankStatus:any
  challengeStatuses: any = []
  rangeProgress = 0
  challengeConfiguration:any

  challengeConfigurations = {
    visitor: new VisitorRangeStrategy(),
    explorer: new ExplorerRangeStrategy(),
    citizen_scientist: new CitizenScientistRangeStrategy(),
    commited_citizen_scientist: new CommitedCitizenScientistRangeStrategy()
  }

  constructor(public global: SimpleGlobal, private userService: UserService) {
    this.challengeConfiguration = this.challengeConfigurations.visitor;
  }

  ngOnInit() {
    this.update()
  }

  toggleInfo() {
    this.showInfo = !this.showInfo
  }

  refreshChallengeConfiguration() {
    if(this.global['currentUser'].rank){
      console.log(this.global['currentUser'].rank.toLowerCase().replace(/\ /g, '_'))
      return this.challengeConfiguration = this.challengeConfigurations[this.global['currentUser'].rank.toLowerCase().replace(/\ /g,'_')]
    }
    return this.challengeConfiguration = this.challengeConfigurations["visitor"]
  }

  getUserChallenges(playerInfo: PlayerInfo) {
    this.playerInfo = playerInfo
    this.rankStatus = this.challengeConfiguration.getRankStatus(playerInfo)
    this.challengeStatuses = this.rankStatus.statuses
    this.rangeProgress = this.rankStatus.progress
  }

  update() {
    this.userService.userInfoMetagame()
      .subscribe(playerInfo => {
        this.refreshPlayerRank(playerInfo)
        this.refreshChallengeConfiguration()
        this.getUserChallenges(playerInfo)
      });
  }

  private refreshPlayerRank(playerInfo) {
    if (playerInfo.rank != this.global['currentUser'].rank) {
      this.global['currentUser'].rank = playerInfo.rank;
      localStorage.setItem('currentUser', JSON.stringify(this.global['currentUser']));
    }
  }

}
