import { RangeStrategy } from "./range-strategy"
import { PlayerInfo } from "app/models/playerInfo"

export class VisitorRangeStrategy extends RangeStrategy {
	challenges = [
		{
			name: "Registrarse en Transcriptor",
			verifyObtention: function (playerInfo: PlayerInfo) {
				return playerInfo.hasBadge({
					name: 'i-was-here'
				})
			}
		},
		{
			name: "Volver ingresar a Transcriptor",
			verifyObtention: function (playerInfo: PlayerInfo) {
				return playerInfo.hasBadge({
					name: 'welcome-back'
				})
			}
		}
  ]
  
  getChallenges() {
    return this.challenges
  }

}