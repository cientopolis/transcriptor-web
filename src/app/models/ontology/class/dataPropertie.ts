import { OntologyClass } from './ontologyClass';
export class DataPropertie {
    id:number;
    label:string;
    name:string;
    property: string;
    comment:string;
    types: Array<string>;
    selected:boolean = false;
    required:boolean = true;
    idInput:string;
    value:string;
    ontologyClass: OntologyClass;

    constructor(propertieJson=null) {
        if (propertieJson){
            this.id=propertieJson.id;
            this.label = propertieJson.label;
            this.name=this.label;
            this.comment = propertieJson.comment;
            this.property = propertieJson.property;
            this.types=propertieJson.types;
            this.ontologyClass=propertieJson.ontologyClass;
            console.log('propertie',this.property);
            this.generateId();
        }
    }
    generateId(){
        this.idInput = Date.now().toString() + this.name;
    }
    getInternalType(type){
        return this.ontologyClass.getInternalType(type);
    }
}
