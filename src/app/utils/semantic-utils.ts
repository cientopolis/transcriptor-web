import { environment } from './../../environments/environment.prod';
export class SemanticUtils {
    // public static regexurl = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    public static regexurl =  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    public static generateLabelWithoutSpaces(label:string):string{
        let labelws=label;
        if(label){
            labelws = label.split(' ').join('_');
        }
        return labelws;
    }

    private static isRelation(item){
        return item['@type']!=null ||  item['@id']!=null;
    }

    //si es invocado de una relacion que se visializa en el prevous save
    private static loadRelation(relation ,isrelation=false){
        let properties = new Array<any>();
        if (!isrelation){
            for (let itemKey in relation) {
                if (itemKey == '@id') {
                    properties.push({ name: itemKey, value: relation[itemKey], model: relation[itemKey], isUrl: true});
                }
            }
        }else{
            for (let itemKey in relation) {
                if (itemKey != '@type' && itemKey != '@id') {
                    if (relation[itemKey]['@id']) {
                        properties.push({ name: itemKey, value: relation[itemKey]['@id'], model: relation[itemKey]['@id'], isUrl: false });
                    }else{
                        properties.push({ name: itemKey, value: relation[itemKey], model: relation[itemKey], isUrl: this.isUrl(relation[itemKey]) });
                    }   
                }
            }
        }
        return properties;
    }



    public static getFromMainEntity(mark,jsonld,isRelation=false) {
        let atributes = new Array<any>();
        for (let key in jsonld) {
            const item = jsonld[key];
            if(this.isRelation(item)){
                let properties = this.loadRelation(item, isRelation);
                atributes.push({ name: key, value: properties, model: properties, isArray: true, type: item['@type'] });
           }else{
                if (key.includes('label')) {
                    mark.name = item
                }
                if (key == '@type'){
                    mark.type = item
                }
                if(key=='@id'){
                    mark.id=item;
                }
                if (key != '@type' && key != '@id') {
                    let url = item;
                    let urlType=null
                    if(this.isUrl(url)){
                        urlType='external';
                    }
                    if(this.isUrlTranscriptor(url)){
                        urlType='internal';
                    }
                    atributes.push({ name: key, value: item, model: item, isArray: false, type: null,urlType: urlType});
                }
            }
        }

        return this.sortProperties(atributes);

    }

    /** consulta si cumple con el formato url */
    public static isUrl(element){
        return this.regexurl.test(element);
    }

    /** consulta si es una urlinterna a transcriptor */
    public static isUrlTranscriptor(element){
        if (this.isUrl(element)){
            let urlprefix = `${environment.semantic_transcription.prefix}`;
            if (element.includes(urlprefix)){
                return true;
            }
            return false;
        }
        let prefix = `${environment.semantic_transcription.keyPefix}`;
        if(element.includes(prefix)){
            return true;
        }
        return false;
    }

    /** quita el prefijo de un id */
    public static extractTranscriptorSchema(id){
        if(id){
            let i = id.indexOf(':');
            return id.substring(i + 1, id.length);
        }
        return id;
    }


    public static extractTranscriptorUrlPrefix(id){
        let urlprefix = `${environment.semantic_transcription.prefix}`;
        if (id && urlprefix){
            if (id.includes(urlprefix)) {
                return id.substring(urlprefix.length,id.length);
            } 
        }
        return id;
    }

    public static getPrefix(type){
        if (type) {
            let i = type.indexOf(':');
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
                    let value = type.substring(i+1, type.length);
                    typereturn = value;
                }
            });
        }
        return typereturn;
    }
    public static filterURLFromOntology(ontologies, type) {
        let typereturn = type;
        if (ontologies && type && this.isUrl(type)) {
            ontologies.forEach(ontology => {
                if (type.includes(ontology.url)) {
                    let i = ontology.url.length;
                    let value = type.substring(i, type.length);
                    typereturn=value;
                }
            });
        }
        return typereturn;
    }

    public static sortProperties(properties){
        properties.sort(
        function compare(a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
        return properties;
    }

}