import { Expose } from "class-transformer";
import { DataType } from "./datatype";

export class Ontology {
    id:number;
    name:string;
    description:string;
    url:string;
    domainkey:string;
    rangekey:string;
    prefix:string;
    ontology_datatypes: DataType[];
    @Expose({ name: "ontology_datatypes" })
    ontology_datatypes_attributes: DataType[];

    constructor(ontologyJson = null){
        if(ontologyJson){
            this.id = ontologyJson.id;
            this.name = ontologyJson.name;
            this.description = ontologyJson.description;
            this.url = ontologyJson.url;
            this.domainkey = ontologyJson.domainkey;
            this.prefix = ontologyJson.prefix; 
        }
    }

    public static mapOntologies(json){
        let ontologies = new Array<Ontology>();
        json.forEach(ontologyJson => {
            ontologies.push(new Ontology(ontologyJson));
        });
        return ontologies;
    }
}