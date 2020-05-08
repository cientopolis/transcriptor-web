import { Badge } from "./badge"
import * as _ from "lodash";

export class PlayerInfo {
    email: string;
    rank: string;
    profile: string;
    badges: Array<Badge>;
    rank_badge_count: number;
    player: any;

    constructor(player) {
        this.player = player
        this.email = this.player.email
        this.rank = this.player.rank
        this.profile = this.player.profile
        this.rank_badge_count = this.player.rank_badge_count
        this.badges = _.map(this.player.badges, Badge.mapToClass)
    }

    static mapToClass(rawPlayerInfo: any): PlayerInfo {
        return new PlayerInfo(rawPlayerInfo.player)
    }

    hasBadge(filter) {
        return _.some(this.badges, filter)
    }

    getAfterPromotedBadgeAmount() {
        return this.badges.length - this.rank_badge_count
    }
}