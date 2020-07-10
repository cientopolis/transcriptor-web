import { Ontology } from 'app/models/ontology/ontology';
export class OntologyClass {
    id:String;
    label:String;
    comment:String;
    name:String
    context:any;
    children: OntologyClass[];
    ontology:Ontology;
    //ver si maneja los elementos seleccionados
    constructor(classJson = null,ontology=null){
        if(classJson){
            this.id = classJson.id;
            this.label = classJson.label;
            this.comment = classJson.comment;
        }
        if(ontology){
            this.ontology=ontology;
            this.name = ontology.prefix+':'+this.label;
        }
        console.log('lalal');
    }

    getName(){
        return  this.ontology.prefix + ':' + this.label;
    }
    getInternalType(type){
        let internaltype='text';
        if (this.ontology.ontology_datatypes) {            
            this.ontology.ontology_datatypes.forEach(dataType => {
                if (type.toLowerCase().includes(dataType.semantic_class.toLowerCase())){
                    console.log('deberia retornar');
                    internaltype=dataType.internal_type;
                }
            });
        }
   
        return internaltype;
    }
}