import { OntologyClass } from './ontologyClass';
export class DataPropertie {
    id:number;
    label:string;
    name:string;
    propertie: string;
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
            this.propertie=propertieJson.propertie;
            this.types=propertieJson.types;
            this.ontologyClass=propertieJson.ontologyClass;
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
