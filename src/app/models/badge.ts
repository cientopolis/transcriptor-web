export class Badge {
    id: number;
    name: string;
    points: string;
    description: string;
    badge_type: string;
    project_id: number;
    image: string;

    static mapToClass(rawBadge: any): Badge {
        var badge = new Badge()
        badge.id = rawBadge.id, 
        badge.name = rawBadge.name, 
        badge.points = rawBadge.points, 
        badge.description = rawBadge.description, 
        badge.badge_type = rawBadge.badge_type, 
        badge.project_id = rawBadge.project_id,    
        badge.image = rawBadge.image
        return badge
    }
}