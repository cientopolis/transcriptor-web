import { OntologyClass } from './ontologyClass';
import { DataPropertieValue } from '../instance/dataPropertieValue';
export class RelationOntologyClass {
    property:string;
    label:string;
    name: string;
    comment: string;
    ontologyClass: OntologyClass;
    properties = new Array<DataPropertieValue>();
    types:Array<String>;
    idInput:string;
    selected=false;
    constructor(relationJson = null, ontologyClass=null) {
        if (relationJson){
            this.property=relationJson.property;
            this.label = relationJson.label;
            this.name= relationJson.label;
            this.comment = relationJson.comment;
            this.types=relationJson.types;
        }
        this.ontologyClass=ontologyClass;
        this.generateId();
    }
    generateId() {
        this.idInput = Date.now().toString() + this.name;
    }
}