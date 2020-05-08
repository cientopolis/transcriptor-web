import { RangeStrategy } from "./range-strategy"
import { PlayerInfo } from "app/models/playerInfo"

export class CitizenScientistRangeStrategy extends RangeStrategy {
	challenges = [
		{
			name: "Consigue 10 insignias más!",
			verifyObtention: function (playerInfo: PlayerInfo) {
				return playerInfo.getAfterPromotedBadgeAmount() >= 10
			}
		}
	]
  
	getChallenges() {
		return this.challenges
	}

	getRankStatus(playerInfo: PlayerInfo) {
		var rankStatus = {
			total: 10,
			obtained: playerInfo.getAfterPromotedBadgeAmount(),
			progress: 0,
			statuses: [],
			progressDescription: '',
			imageSrc: this.getImageSrc()
		}
		this.getChallenges().forEach(challenge => {
			rankStatus.statuses.push({
				challenge: challenge,
				obtained: challenge.verifyObtention(playerInfo)
			})
		});
		rankStatus.progress = (rankStatus.obtained * 100) / rankStatus.total
		rankStatus.progressDescription = `${rankStatus.obtained}/${rankStatus.total} insignias conseguidas`
		return rankStatus
	}

	getImageSrc() {
		return 'assets/img/dashboard/ranks/citizen_scientist.png';
	}
}