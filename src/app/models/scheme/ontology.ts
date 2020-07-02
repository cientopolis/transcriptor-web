
export class Ontology {
    id:number;
    name:string;
    description:string;
    url:string;
    domainkey:string;
    prefix:string;

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