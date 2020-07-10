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
    class_type:string;
    literal_type: string;
    ontology_datatypes: Array<any>;
    @Expose({ name: "ontology_datatypes" })
    ontology_datatypes_attributes: Array<any>;

    constructor(ontologyJson = null){
        if(ontologyJson){
            this.id = ontologyJson.id;
            this.name = ontologyJson.name;
            this.description = ontologyJson.description;
            this.url = ontologyJson.url;
            this.domainkey = ontologyJson.domainkey;
            this.prefix = ontologyJson.prefix; 
            this.ontology_datatypes = ontologyJson.ontology_datatypes;
            this.formatDatatypes();
        }
    }

     public formatDatatypes(){
         if (this.ontology_datatypes) {
            
             this.ontology_datatypes.forEach(datatype => {
                 if (datatype.semantic_class.includes(this.prefix)){
                     let pref = this.prefix; 
                     if(!this.prefix.includes(':')){
                         pref = pref+':';
                     }
                     datatype.semantic_class = datatype.semantic_class.split(pref)[1];
                 }
                 if (datatype.semantic_class.includes(this.url)){
                     datatype.semantic_class = datatype.semantic_class.split(this.url)[1];
                 }           
             });
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
