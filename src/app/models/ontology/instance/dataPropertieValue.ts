import { DataPropertie } from "../class/dataPropertie";

export class DataPropertieValue {
    id: number;
    name: string;
    comment: string;
    type: string;
    canDelete: boolean = true;
    property:string;
    value: String;
    dataPropertie:DataPropertie;
    
    constructor(propertieJson = null) {
        if(propertieJson!=null){
            this.id = propertieJson.id;
            this.name = propertieJson.name;
            this.property = propertieJson.property;
            this.comment = propertieJson.comment;
            if (propertieJson.types){
                this.type = propertieJson.types[0];
            }
            this.value='';
            this.dataPropertie = propertieJson;
        }
    }
    getInternalType(){
        return this.dataPropertie.getInternalType(this.type);
    }
    getNameWithPrefix(){
        return this.dataPropertie.ontologyClass.ontology.prefix + ':' + this.name;
    }

}