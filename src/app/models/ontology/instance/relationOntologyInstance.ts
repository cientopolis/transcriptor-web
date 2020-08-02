import { ontologyClassInstance } from './ontologyClassInstance';
import { DataPropertieValue } from './dataPropertieValue';
export class RelationOntologyInstance {
    label: string;
    property: string;
    name: string;
    comment: string;
    type: string;
    properties = new Array<DataPropertieValue>();
    ontologyInstance:ontologyClassInstance;
    searchRelationship:boolean =true;
    relationPersisted:any;
    constructor(relationJson = null) {
        if (relationJson) {
            this.property = relationJson.property;
            this.label = relationJson.label;
            this.name = relationJson.label;
            this.comment = relationJson.comment;
            this.type=relationJson.types[0];
        }
    }
    getName(){
        if (this.ontologyInstance.getOntologyPrefix() && this.ontologyInstance.getOntologyPrefix()!=""){
            return this.ontologyInstance.getOntologyPrefix() + ':' + this.label;
        }
        return this.label;
    }

}