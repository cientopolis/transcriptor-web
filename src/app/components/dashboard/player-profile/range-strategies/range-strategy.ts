import { PlayerInfo } from "app/models/playerInfo";

export class RangeStrategy {

    getChallenges() {
        return []
    }

    getRankStatus(playerInfo: PlayerInfo) {
        var rankStatus = {
            total: this.getChallenges().length,
            obtained: 0,
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
        let obtainedChallenges = rankStatus.statuses.filter(challengeStatus => { return challengeStatus.obtained })
        rankStatus.obtained = obtainedChallenges.length
        rankStatus.progress = (obtainedChallenges.length * 100) / rankStatus.statuses.length
        rankStatus.progressDescription = `${rankStatus.obtained}/${rankStatus.total} retos conseguidos`
        return rankStatus
    }

    getImageSrc() {
        return 'assets/img/dashboard/ranks/visitor.png';
    }
}