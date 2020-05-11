import { Type, Transform } from "class-transformer";

export class Contribution {
    text: string;
    @Type(() => Date)
    updated_at: Date;
    @Type(() => Date)
    created_at: Date;
    mark_id: number;
    cached_weighted_score: number;
    schema_type: string;
    user: any;

}