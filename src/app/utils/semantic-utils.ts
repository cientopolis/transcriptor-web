import { environment } from './../../environments/environment.prod';
export class SemanticUtils {
    public static regexurl = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

    public static generateLabelWithoutSpaces(label:string):string{
        let labelws=label;
        if(label){
            labelws = label.split(' ').join('_');
        }
        return labelws;
    }

    private static isRelation(item){
        return item['@type']!=null;
    }

    //si es invocado de una relacion que se visializa en el prevous save
    private static loadRelation(relation ,isrelation=false){
        let properties = new Array<any>();
        if (!isrelation){
            console.log('no es relacion');
            for (let itemKey in relation) {
                if (itemKey == '@id') {
                    console.log('id de la relacion:');
                    console.log(relation[itemKey]);
                    properties.push({ name: itemKey, value: relation[itemKey], model: relation[itemKey], isUrl: true});
                }
            }
        }else{
            console.log('es relacion');
            for (let itemKey in relation) {
                if (itemKey != '@type' && itemKey != '@id') {
                    properties.push({ name: itemKey, value: relation[itemKey], model: relation[itemKey], isUrl: this.isUrl(relation[itemKey]) });
                }
            }
        }
        return properties;
    }



    public static getFromMainEntity(mark,jsonld,isRelation=false) {
        let atributes = new Array<any>();
        for (let key in jsonld) {
            const item = jsonld[key];
            console.log(item);
            if(this.isRelation(item)){
                console.log('tiene relacion');
                let properties = this.loadRelation(item, isRelation);
                atributes.push({ name: key, value: properties, model: properties, isArray: true, type: item['@type'] });
           }else{
                if (key.includes('label')) {
                    mark.name = item
                }
                if (key != '@type' && key != '@id') {
                    atributes.push({ name: key, value: item, model: item, isArray: false, type: null,isUrl:this.isUrl(item) });
                }
            }
        }
        return atributes;

    }
    public static isUrl(element){
        return this.regexurl.test(element);
    }
    public static extractTranscriptorSchema(id){
        if(id){
            let i = id.indexOf(':');
            return id.substring(i + 1, id.length);
        }
        return id;
    }
    public static extractTranscriptorUrlPrefix(id){
        let urlprefix = `${environment.semantic_transcription.prefix}`;
        console.log(urlprefix);
        if (id && urlprefix){
            if (id.includes(urlprefix)) {
                console.log(id.substring(urlprefix.length, id.length));
                return id.substring(urlprefix.length,id.length);
            } 
        }
        return id;
    }

    public static getPrefix(type){
        if (type) {
            let i = type.indexOf(':');
            console.log(type.substring(0, i));
            return type.substring(0, i);
        }
        return type;
    }

    public static filterPrefixFromOntology(ontologies,type){
        
        let typereturn = type;
        if(ontologies && type && !this.isUrl(type)){
            ontologies.forEach(ontology => {
                if(type.includes(ontology.prefix)){
                    let i = ontology.prefix.length;
                    let value = type.substring(i, type.length);
                    console.log(value);
                    typereturn = value;
                }
            });
        }
        return typereturn;
    }
    public static filterURLFromOntology(ontologies, type) {
        let typereturn = type;
        console.log(type);
        if (ontologies && type && this.isUrl(type)) {
            ontologies.forEach(ontology => {
                if (type.includes(ontology.url)) {
                    let i = ontology.url.length;
                    let value = type.substring(i, type.length);
                    console.log(value);
                    typereturn=value;
                }
            });
        }
        return typereturn;
    }

}