import { RangeStrategy } from "./range-strategy"
import { PlayerInfo } from "app/models/playerInfo"

export class CommitedCitizenScientistRangeStrategy extends RangeStrategy {
	challenges = [
		{
			name: "¡Seguí transcribiendo!, pronto agregaremos más rangos.",
			verifyObtention: function (playerInfo: PlayerInfo) {
				return false
			}
		}
	]
  
	getChallenges() {
		return this.challenges
	}

	getRankStatus(playerInfo: PlayerInfo) {
		var rankStatus = {
			total: 100,
			obtained: 100,
			progress: 100,
			statuses: [],
			progressDescription: '¡Lo lograste!',
			imageSrc: this.getImageSrc()
		}
		this.getChallenges().forEach(challenge => {
			rankStatus.statuses.push({
				challenge: challenge,
				obtained: challenge.verifyObtention(playerInfo)
			})
		});
		return rankStatus
	}

	getImageSrc() {
		return 'assets/img/dashboard/ranks/commited_citizen_scientist.png';
	}
}