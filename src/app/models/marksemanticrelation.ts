export class MarkSemanticRelation {
    subject_id: string;
    predicate_id: string;
    object_id: string;
    constructor(relationjson=null){
        if(relationjson){
            this.object_id = relationjson.object_id;
            this.predicate_id = relationjson.predicate_id;
            this.subject_id = relationjson.subject_id;
        }
    }
}