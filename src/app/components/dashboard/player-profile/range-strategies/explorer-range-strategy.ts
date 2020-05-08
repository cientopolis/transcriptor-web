import { RangeStrategy } from "./range-strategy"
import { PlayerInfo } from "app/models/playerInfo"

export class ExplorerRangeStrategy extends RangeStrategy {
	challenges = [
		{
			name: "Obtené una insignia de Contribución",
			verifyObtention: function (playerInfo: PlayerInfo) {
				return playerInfo.hasBadge({
					badge_type: "contribution"
				})
			}
		},
		{
			name: "Obtené una insignia de Refuerzo",
			verifyObtention: function (playerInfo: PlayerInfo) {
				return playerInfo.hasBadge({
					badge_type: "reinforcement"
				})
			}
		},
		{
			name: "Contales a tus amigos sobre Transcriptor",
			verifyObtention: function (playerInfo: PlayerInfo) {
				return playerInfo.hasBadge({
					badge_type: "dissemination"
				})
			}
		}
  ]
  
  getChallenges() {
    return this.challenges
  }

  getImageSrc() {
	  return 'assets/img/dashboard/ranks/explorer.png';
  }

}