import { RelationOntologyInstance } from './relationOntologyInstance';
import { RelationOntologyClass } from './../class/relationOntologyClass';

import { DataPropertieValue } from './dataPropertieValue';
import { OntologyClass } from '../class/ontologyClass';
export class ontologyClassInstance {
    id: String;
    name: String;
    comment: String;
    ontologyClass: OntologyClass;
    properties = new Array<DataPropertieValue>();
    relations = new Array <RelationOntologyInstance>();
    constructor(ontologyClass = null) {
        if (ontologyClass){
            this.ontologyClass = ontologyClass;
            this.name=ontologyClass.name;
            this.id = ontologyClass.id;
        }
    }
    getNameWithPrefix(){
        return this.ontologyClass.getName();
    }
    getOntologyPrefix(){
        return this.ontologyClass.ontology.prefix;
    }
}